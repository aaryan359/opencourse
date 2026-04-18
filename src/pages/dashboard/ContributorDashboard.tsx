import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Camera, Mail, ShieldCheck, UserCircle2 } from 'lucide-react';
import { contributeApi } from '@/api/contribute.api';
import { userApi } from '@/api/user.api';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { initializeAuth } from '@/redux/slice/authSlice';
import type {
  ContributorApplication,
  DashboardStats,
  UserUploadItem,
} from '@/types';

const splitListInput = (value: string): string[] =>
  value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

const readImageAsAvatarDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== 'string') {
        reject(new Error('Could not read image.'));
        return;
      }

      const image = new Image();
      image.onload = () => {
        const maxSide = 320;
        const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');

        if (!context) {
          reject(new Error('Could not process image.'));
          return;
        }

        context.drawImage(image, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', 0.82);
        resolve(compressed);
      };

      image.onerror = () => reject(new Error('Invalid image file.'));
      image.src = result;
    };

    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.readAsDataURL(file);
  });

const statusBadgeClass: Record<'pending' | 'approved' | 'rejected', string> = {
  pending: 'border border-amber-500/30 bg-amber-500/10 text-amber-300',
  approved: 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  rejected: 'border border-rose-500/30 bg-rose-500/10 text-rose-300',
};

const uploadStatusClass: Record<'pending' | 'approved' | 'rejected', string> = {
  pending: 'border border-amber-500/30 bg-amber-500/10 text-amber-300',
  approved: 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  rejected: 'border border-rose-500/30 bg-rose-500/10 text-rose-300',
};

export default function ContributorDashboard() {
  const dispatch = useAppDispatch();
  const { user, token, initialized } = useAppSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState<'profile' | 'contributor'>('profile');

  const [loadingContributorData, setLoadingContributorData] = useState(true);
  const [application, setApplication] = useState<ContributorApplication | null>(null);
  const [uploads, setUploads] = useState<UserUploadItem[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const [submittingApplication, setSubmittingApplication] = useState(false);
  const [motivation, setMotivation] = useState('');
  const [portfolioInput, setPortfolioInput] = useState('');
  const [topicsInput, setTopicsInput] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
  const [avatarPreviewError, setAvatarPreviewError] = useState(false);
  const [avatarFileName, setAvatarFileName] = useState('');
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarUploadProgress, setAvatarUploadProgress] = useState(0);

  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const isLoggedIn = Boolean(user && token);
  const isApprovedContributor =
    user?.role === 'contributor' || user?.contributorStatus === 'approved';

  const displayName =
    [firstName.trim(), lastName.trim()].filter(Boolean).join(' ') ||
    [user?.profile?.firstName, user?.profile?.lastName].filter(Boolean).join(' ') ||
    user?.username ||
    'User';
  const avatarUrl = avatar.trim() || user?.profile?.avatar?.trim() || '';
  const profileSkills = splitListInput(skillsInput);
  const uploadedCount = stats?.uploadedVideos ?? user?.stats?.uploadedVideos ?? uploads.length;
  const profileXp = stats?.xp ?? user?.stats?.xp ?? 0;
  const profileLevel = stats?.level ?? user?.stats?.level ?? 1;

  useEffect(() => {
    setFirstName(user?.profile?.firstName ?? '');
    setLastName(user?.profile?.lastName ?? '');
    setTitle(user?.profile?.title ?? '');
    setBio(user?.profile?.bio ?? '');
    setAvatar(user?.profile?.avatar ?? '');
    setSkillsInput((user?.profile?.skills ?? []).join(', '));
  }, [user]);

  useEffect(() => {
    setAvatarPreviewError(false);
  }, [avatar, user?.profile?.avatar]);

  useEffect(() => {
    if (!initialized || !isLoggedIn) {
      setLoadingContributorData(false);
      return;
    }

    const loadContributorData = async () => {
      setLoadingContributorData(true);

      try {
        const [applicationResponse, statsResponse, uploadsResponse] = await Promise.all([
          contributeApi.getMyApplication(),
          userApi.getMyStats(),
          userApi.getMyUploads({ limit: 20 }),
        ]);

        const appData = applicationResponse.data?.data ?? null;
        setApplication(appData);

        if (appData?.status === 'pending' || appData?.status === 'rejected') {
          setMotivation(appData.motivation ?? '');
          setPortfolioInput((appData.portfolioLinks ?? []).join('\n'));
          setTopicsInput((appData.intendedTopics ?? []).join('\n'));
        }

        setStats(statsResponse.data?.data ?? null);
        setUploads(uploadsResponse.data?.data ?? []);
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : 'Could not load dashboard information.';
        toast.error(message);
      } finally {
        setLoadingContributorData(false);
      }
    };

    void loadContributorData();
  }, [initialized, isLoggedIn]);

  const motivationCount = motivation.trim().length;
  const canSubmitApplication = useMemo(() => {
    if (submittingApplication) return false;
    if (application?.status === 'pending') return false;
    return motivationCount >= 50;
  }, [submittingApplication, application?.status, motivationCount]);

  const handleProfileSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSavingProfile(true);
      await userApi.updateMyProfile({
        profile: {
          firstName: firstName.trim() || undefined,
          lastName: lastName.trim() || undefined,
          title: title.trim() || undefined,
          bio: bio.trim() || undefined,
          avatar: avatar.trim() || undefined,
          skills: splitListInput(skillsInput),
        },
      });

      toast.success('Profile updated successfully.');
      await dispatch(initializeAuth()).unwrap();
    } catch (error: unknown) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message === 'string'
          ? (error as { response?: { data?: { message?: string } } }).response?.data
              ?.message ?? 'Failed to update profile.'
          : error instanceof Error
            ? error.message
            : 'Failed to update profile.';
      toast.error(message);
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentPassword || !newPassword) {
      toast.error('Current and new password are required.');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirmation do not match.');
      return;
    }

    try {
      setUpdatingPassword(true);
      await userApi.changeMyPassword({
        currentPassword,
        newPassword,
      });

      toast.success('Password changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: unknown) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message === 'string'
          ? (error as { response?: { data?: { message?: string } } }).response?.data
              ?.message ?? 'Failed to change password.'
          : error instanceof Error
            ? error.message
            : 'Failed to change password.';
      toast.error(message);
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleContributorApply = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (motivationCount < 50) {
      toast.error('Please write at least 50 characters in motivation.');
      return;
    }

    try {
      setSubmittingApplication(true);
      const response = await contributeApi.applyForContributor({
        motivation: motivation.trim(),
        portfolioLinks: splitListInput(portfolioInput),
        intendedTopics: splitListInput(topicsInput),
      });

      setApplication(response.data?.data ?? null);
      toast.success('Application submitted. We will review it soon.');
      await dispatch(initializeAuth()).unwrap();
    } catch (error: unknown) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message === 'string'
          ? (error as { response?: { data?: { message?: string } } }).response?.data
              ?.message ?? 'Failed to submit application.'
          : error instanceof Error
            ? error.message
            : 'Failed to submit application.';
      toast.error(message);
    } finally {
      setSubmittingApplication(false);
    }
  };

  const handleAvatarUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB.');
      return;
    }

    try {
      setAvatarUploading(true);
      setAvatarUploadProgress(0);

      const progressInterval = window.setInterval(() => {
        setAvatarUploadProgress((previous) => (previous >= 90 ? previous : previous + 10));
      }, 80);

      const dataUrl = await readImageAsAvatarDataUrl(file);

      window.clearInterval(progressInterval);
      setAvatarUploadProgress(100);
      setAvatar(dataUrl);
      setAvatarFileName(file.name);
      setAvatarPreviewError(false);
      toast.success('Profile picture uploaded. Click Save Profile to apply.');

      window.setTimeout(() => {
        setAvatarUploading(false);
        setAvatarUploadProgress(0);
      }, 350);
    } catch (error: unknown) {
      setAvatarUploading(false);
      setAvatarUploadProgress(0);
      toast.error(error instanceof Error ? error.message : 'Failed to process image.');
    }
  };

  if (!initialized) {
    return (
      <section className='min-h-screen bg-[#050506] px-4 py-16 md:px-8'>
        <div className='mx-auto max-w-3xl animate-pulse space-y-4 rounded-2xl border border-white/10 bg-[#0b0b10] p-8'>
          <div className='h-8 w-2/3 rounded bg-white/10' />
          <div className='h-4 w-3/4 rounded bg-white/10' />
          <div className='h-36 w-full rounded bg-white/10' />
        </div>
      </section>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to='/login' replace />;
  }

  return (
    <section className='min-h-screen bg-[#050506] px-4 py-12 text-zinc-100 md:px-8 md:py-16'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-6 rounded-2xl border border-white/10 bg-linear-to-br from-[#0d0f16] via-[#0b0b10] to-[#131320] p-6'>
          <div className='flex flex-col gap-5 md:flex-row md:items-center md:justify-between'>
            <div className='flex items-center gap-4'>
              <div className='h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-[#151624]'>
                {avatarUrl && !avatarPreviewError ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className='h-full w-full object-cover'
                    onError={() => setAvatarPreviewError(true)}
                  />
                ) : (
                  <div className='flex h-full w-full items-center justify-center bg-linear-to-br from-[#5E6AD2] to-purple-500 text-lg font-semibold text-white'>
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div>
                <h1 className='text-2xl font-semibold md:text-3xl'>{displayName}</h1>
                <p className='mt-1 text-sm text-zinc-400 md:text-base'>
                  Manage your profile, contributor application, and contributions from one place.
                </p>
              </div>
            </div>

            <div className='grid grid-cols-3 gap-2 text-xs md:text-sm'>
              <div className='rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center'>
                <p className='text-zinc-400'>Uploads</p>
                <p className='mt-1 text-base font-semibold text-white'>{uploadedCount}</p>
              </div>
              <div className='rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center'>
                <p className='text-zinc-400'>XP</p>
                <p className='mt-1 text-base font-semibold text-white'>{profileXp}</p>
              </div>
              <div className='rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center'>
                <p className='text-zinc-400'>Level</p>
                <p className='mt-1 text-base font-semibold text-white'>{profileLevel}</p>
              </div>
            </div>
          </div>

          <div className='mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-400'>
            <span className='rounded-full border border-white/10 bg-white/5 px-2.5 py-1'>@{user?.username}</span>
            <span className='rounded-full border border-white/10 bg-white/5 px-2.5 py-1'>{user?.email}</span>
            <span className='rounded-full border border-white/10 bg-white/5 px-2.5 py-1 capitalize'>role: {user?.role}</span>
            <span className='rounded-full border border-white/10 bg-white/5 px-2.5 py-1 capitalize'>
              contributor: {user?.contributorStatus ?? 'none'}
            </span>
          </div>
        </div>

        <div className='mb-6 flex flex-wrap gap-2'>
          <button
            type='button'
            onClick={() => setActiveTab('profile')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === 'profile'
                ? 'bg-indigo-500 text-white'
                : 'border border-white/10 bg-[#0b0b10] text-zinc-300 hover:bg-white/10'
            }`}
          >
            Profile
          </button>
          <button
            type='button'
            onClick={() => setActiveTab('contributor')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === 'contributor'
                ? 'bg-indigo-500 text-white'
                : 'border border-white/10 bg-[#0b0b10] text-zinc-300 hover:bg-white/10'
            }`}
          >
            Contributor
          </button>
        </div>

        {activeTab === 'profile' && (
          <div className='grid gap-6 lg:grid-cols-[1.15fr_0.85fr]'>
            <form
              onSubmit={handleProfileSave}
              className='rounded-2xl border border-white/10 bg-[#0b0b10] p-6 md:p-8'
            >
              <h2 className='text-xl font-semibold'>Profile Details</h2>
              <p className='mt-2 text-sm text-zinc-400'>
                Keep your profile updated so other learners and contributors know you better.
              </p>

              <div className='mt-6 rounded-xl border border-white/10 bg-[#11131c] p-4'>
                <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
                  <div className='h-20 w-20 overflow-hidden rounded-2xl border border-white/10 bg-[#151624]'>
                    {avatarUrl && !avatarPreviewError ? (
                      <img
                        src={avatarUrl}
                        alt={displayName}
                        className='h-full w-full object-cover'
                        onError={() => setAvatarPreviewError(true)}
                      />
                    ) : (
                      <div className='flex h-full w-full items-center justify-center bg-linear-to-br from-[#5E6AD2] to-purple-500 text-xl font-semibold text-white'>
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className='min-w-0 flex-1 space-y-2'>
                    <Label htmlFor='avatarUpload' className='flex items-center gap-2 text-zinc-300'>
                      <Camera className='h-4 w-4 text-indigo-300' />
                      Upload Profile Picture
                    </Label>
                    <input
                      id='avatarUpload'
                      type='file'
                      accept='image/*'
                      onChange={handleAvatarUpload}
                      disabled={avatarUploading}
                      className='block w-full cursor-pointer rounded-md border border-white/10 bg-[#121218] px-3 py-2 text-sm text-zinc-300 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-indigo-500 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-indigo-400'
                    />
                    {avatarUploading && (
                      <div className='space-y-2 pt-1'>
                        <div className='h-2 w-full overflow-hidden rounded-full bg-white/10'>
                          <div
                            className='h-full rounded-full bg-linear-to-r from-indigo-400 to-cyan-400 transition-all duration-200'
                            style={{ width: `${avatarUploadProgress}%` }}
                          />
                        </div>
                        <p className='text-xs text-indigo-300'>
                          Processing image... {avatarUploadProgress}%
                        </p>
                      </div>
                    )}
                    {avatarFileName && (
                      <p className='text-xs text-zinc-400'>Selected: {avatarFileName}</p>
                    )}
                    <p className='text-xs text-zinc-500'>
                      This photo is also used in the header account icon after saving your profile.
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='firstName' className='text-zinc-300'>
                    First Name
                  </Label>
                  <Input
                    id='firstName'
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    className='border-white/10 bg-[#121218] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/50'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='lastName' className='text-zinc-300'>
                    Last Name
                  </Label>
                  <Input
                    id='lastName'
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    className='border-white/10 bg-[#121218] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/50'
                  />
                </div>
              </div>

              <div className='mt-4 space-y-2'>
                <Label htmlFor='title' className='text-zinc-300'>
                  Title
                </Label>
                <Input
                  id='title'
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder='Frontend Developer, Data Scientist, etc.'
                  className='border-white/10 bg-[#121218] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/50'
                />
              </div>

              <div className='mt-4 space-y-2'>
                <Label htmlFor='skills' className='text-zinc-300'>
                  Skills (comma or line separated)
                </Label>
                <textarea
                  id='skills'
                  rows={3}
                  value={skillsInput}
                  onChange={(event) => setSkillsInput(event.target.value)}
                  placeholder='React, Node.js, System Design'
                  className='w-full rounded-md border border-white/10 bg-[#121218] px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30'
                />
              </div>

              <div className='mt-4 space-y-2'>
                <Label htmlFor='bio' className='text-zinc-300'>
                  Bio
                </Label>
                <textarea
                  id='bio'
                  rows={5}
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  placeholder='Write a short intro about your experience and interests.'
                  className='w-full rounded-md border border-white/10 bg-[#121218] px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30'
                />
              </div>

              <div className='mt-6'>
                <Button type='submit' className='w-full' disabled={savingProfile}>
                  {savingProfile ? 'Saving profile...' : 'Save Profile'}
                </Button>
              </div>
            </form>

            <form
              onSubmit={handlePasswordUpdate}
              className='rounded-2xl border border-white/10 bg-[#0b0b10] p-6 md:p-8'
            >
              <div className='mb-6 rounded-xl border border-white/10 bg-[#11131c] p-4'>
                <h2 className='text-xl font-semibold'>Profile Summary</h2>
                <div className='mt-4 space-y-3 text-sm text-zinc-300'>
                  <div className='flex items-center gap-2 text-zinc-200'>
                    <UserCircle2 className='h-4 w-4 text-indigo-300' />
                    <span className='font-medium'>{displayName}</span>
                  </div>
                  <div className='flex items-center gap-2 text-zinc-300'>
                    <Mail className='h-4 w-4 text-zinc-400' />
                    <span className='truncate'>{user?.email}</span>
                  </div>
                  <div className='flex items-center gap-2 text-zinc-300 capitalize'>
                    <ShieldCheck className='h-4 w-4 text-zinc-400' />
                    <span>
                      {user?.role} • Contributor {user?.contributorStatus ?? 'none'}
                    </span>
                  </div>
                  {title && (
                    <p className='text-zinc-300'>
                      <span className='text-zinc-500'>Title:</span> {title}
                    </p>
                  )}
                  {bio && (
                    <p className='text-zinc-300'>
                      <span className='text-zinc-500'>Bio:</span> {bio}
                    </p>
                  )}
                  <div>
                    <p className='mb-1 text-zinc-500'>Skills</p>
                    <div className='flex flex-wrap gap-2'>
                      {profileSkills.length > 0 ? (
                        profileSkills.map((skill) => (
                          <span
                            key={skill}
                            className='rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300'
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className='text-xs text-zinc-500'>No skills added yet.</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <h2 className='text-xl font-semibold'>Change Password</h2>
              <p className='mt-2 text-sm text-zinc-400'>
                Keep your account secure by updating your password regularly.
              </p>

              <div className='mt-6 space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='currentPassword' className='text-zinc-300'>
                    Current Password
                  </Label>
                  <Input
                    id='currentPassword'
                    type='password'
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    className='border-white/10 bg-[#121218] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/50'
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='newPassword' className='text-zinc-300'>
                    New Password
                  </Label>
                  <Input
                    id='newPassword'
                    type='password'
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    className='border-white/10 bg-[#121218] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/50'
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='confirmPassword' className='text-zinc-300'>
                    Confirm New Password
                  </Label>
                  <Input
                    id='confirmPassword'
                    type='password'
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className='border-white/10 bg-[#121218] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/50'
                    required
                  />
                </div>
              </div>

              <div className='mt-6'>
                <Button type='submit' className='w-full' disabled={updatingPassword}>
                  {updatingPassword ? 'Updating password...' : 'Update Password'}
                </Button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'contributor' && (
          <div className='space-y-6'>
            {loadingContributorData && (
              <div className='grid gap-4 md:grid-cols-3'>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className='h-28 animate-pulse rounded-xl border border-white/10 bg-[#0b0b10]'
                  />
                ))}
              </div>
            )}

            {!loadingContributorData && isApprovedContributor && (
              <>
                <div className='grid gap-4 md:grid-cols-3'>
                  <div className='rounded-xl border border-white/10 bg-[#0b0b10] p-5'>
                    <p className='text-xs uppercase tracking-wide text-zinc-500'>Uploaded Videos</p>
                    <p className='mt-2 text-2xl font-semibold text-zinc-100'>
                      {stats?.uploadedVideos ?? uploads.length}
                    </p>
                  </div>
                  <div className='rounded-xl border border-white/10 bg-[#0b0b10] p-5'>
                    <p className='text-xs uppercase tracking-wide text-zinc-500'>XP</p>
                    <p className='mt-2 text-2xl font-semibold text-zinc-100'>{stats?.xp ?? 0}</p>
                  </div>
                  <div className='rounded-xl border border-white/10 bg-[#0b0b10] p-5'>
                    <p className='text-xs uppercase tracking-wide text-zinc-500'>Level</p>
                    <p className='mt-2 text-2xl font-semibold text-zinc-100'>{stats?.level ?? 1}</p>
                  </div>
                </div>

                <div className='rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6'>
                  <p className='inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300'>
                    Contributor Approved
                  </p>
                  <h2 className='mt-3 text-xl font-semibold'>Contribution Workspace</h2>
                  <p className='mt-2 text-sm text-zinc-200/90'>
                    Continue creating courses and interview contributions from the contributor workspace.
                  </p>
                  <Link
                    to='/contribute'
                    className='mt-4 inline-flex rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-400'
                  >
                    Open Contribution Workspace
                  </Link>
                </div>

                <div className='rounded-2xl border border-white/10 bg-[#0b0b10] p-6'>
                  <h3 className='text-lg font-semibold'>Your Contributions</h3>
                  {uploads.length === 0 ? (
                    <p className='mt-2 text-sm text-zinc-400'>
                      No contributions yet. Start from the contribution workspace.
                    </p>
                  ) : (
                    <div className='mt-4 space-y-3'>
                      {uploads.map((item) => (
                        <article
                          key={item._id}
                          className='rounded-xl border border-white/10 bg-[#121218] p-4'
                        >
                          <div className='flex flex-wrap items-center justify-between gap-2'>
                            <h4 className='text-base font-medium text-zinc-100'>{item.title}</h4>
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${uploadStatusClass[item.status]}`}
                            >
                              {item.status}
                            </span>
                          </div>
                          <p className='mt-2 text-xs text-zinc-400'>
                            {item.course?.title ?? 'Unknown course'} • {item.topic?.title ?? 'Unknown topic'}
                          </p>
                          {item.description && (
                            <p className='mt-2 text-sm text-zinc-300'>{item.description}</p>
                          )}
                          {item.reviewNote && (
                            <p className='mt-2 text-sm text-rose-300'>
                              Review note: {item.reviewNote}
                            </p>
                          )}
                          <p className='mt-2 text-xs text-zinc-500'>
                            {new Date(item.createdAt).toLocaleString()}
                          </p>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {!loadingContributorData && !isApprovedContributor && (
              <div className='grid gap-6 lg:grid-cols-[1.1fr_0.9fr]'>
                <div className='rounded-2xl border border-white/10 bg-[#0b0b10] p-6 md:p-8'>
                  <p className='mb-3 inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300'>
                    Contributor Application
                  </p>
                  <h2 className='text-2xl font-semibold md:text-3xl'>Apply as Contributor</h2>
                  <p className='mt-3 text-sm text-zinc-400 md:text-base'>
                    Apply here and track your status from this dashboard.
                  </p>

                  <form onSubmit={handleContributorApply} className='mt-8 space-y-4'>
                    <div>
                      <label htmlFor='motivation' className='mb-2 block text-sm text-zinc-300'>
                        Why do you want to contribute? <span className='text-rose-300'>*</span>
                      </label>
                      <textarea
                        id='motivation'
                        rows={7}
                        value={motivation}
                        onChange={(event) => setMotivation(event.target.value)}
                        placeholder='Tell us about your experience, strengths, and how your content will help learners...'
                        className='w-full rounded-xl border border-white/10 bg-[#121218] px-3 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30'
                      />
                      <p className={`mt-1 text-xs ${motivationCount >= 50 ? 'text-emerald-300' : 'text-zinc-500'}`}>
                        {motivationCount}/50 minimum characters
                      </p>
                    </div>

                    <div>
                      <label htmlFor='portfolio' className='mb-2 block text-sm text-zinc-300'>
                        Portfolio Links (optional)
                      </label>
                      <textarea
                        id='portfolio'
                        rows={4}
                        value={portfolioInput}
                        onChange={(event) => setPortfolioInput(event.target.value)}
                        placeholder='One URL per line or comma separated (GitHub, LinkedIn, portfolio, etc.)'
                        className='w-full rounded-xl border border-white/10 bg-[#121218] px-3 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30'
                      />
                    </div>

                    <div>
                      <label htmlFor='topics' className='mb-2 block text-sm text-zinc-300'>
                        Intended Topics (optional)
                      </label>
                      <textarea
                        id='topics'
                        rows={3}
                        value={topicsInput}
                        onChange={(event) => setTopicsInput(event.target.value)}
                        placeholder='Example: React, Node.js, System Design (line or comma separated)'
                        className='w-full rounded-xl border border-white/10 bg-[#121218] px-3 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30'
                      />
                    </div>

                    <button
                      type='submit'
                      disabled={!canSubmitApplication}
                      className='w-full rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-indigo-500/40'
                    >
                      {submittingApplication
                        ? 'Submitting...'
                        : application?.status === 'rejected'
                          ? 'Re-Apply as Contributor'
                          : 'Apply as Contributor'}
                    </button>
                  </form>
                </div>

                <aside className='space-y-4'>
                  <div className='rounded-2xl border border-white/10 bg-[#0b0b10] p-6'>
                    <h3 className='text-lg font-semibold'>Application Status</h3>
                    {application ? (
                      <>
                        <span className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusBadgeClass[application.status]}`}>
                          {application.status}
                        </span>
                        <p className='mt-3 text-sm text-zinc-400'>
                          Submitted on {new Date(application.createdAt).toLocaleDateString()}
                        </p>
                        {application.reviewNote && (
                          <div className='mt-3 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200'>
                            <p className='font-medium'>Review Note</p>
                            <p className='mt-1'>{application.reviewNote}</p>
                          </div>
                        )}
                        {application.status === 'pending' && (
                          <p className='mt-3 text-sm text-amber-300'>
                            Your application is under review. You cannot submit another one right now.
                          </p>
                        )}
                      </>
                    ) : (
                      <p className='mt-2 text-sm text-zinc-400'>
                        You have not submitted any contributor application yet.
                      </p>
                    )}
                  </div>
                </aside>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
