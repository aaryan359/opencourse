import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { registerUser } from '@/redux/slice/authSlice';

export default function Register() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const loading = useAppSelector((state) => state.auth.loading);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!username.trim() || !email.trim() || !password) {
			toast.error('Username, email, and password are required.');
			return;
		}

		if (password.length < 6) {
			toast.error('Password must be at least 6 characters.');
			return;
		}

		if (password !== confirmPassword) {
			toast.error('Passwords do not match.');
			return;
		}

		try {
			await dispatch(
				registerUser({
				username: username.trim(),
				email: email.trim(),
				password,
				profile: {
					firstName: firstName.trim() || undefined,
					lastName: lastName.trim() || undefined,
				},
				}),
			).unwrap();
			toast.success('Account created successfully!');
			navigate('/');
		} catch (error: unknown) {
			const message =
				error instanceof Error
					? error.message
					: 'Registration failed. Please try again.';
			toast.error(message);
		}
	};

	return (
		<section className='flex min-h-screen bg-[#050506] px-4 py-16 md:py-24'>
			<form
				onSubmit={onSubmit}
				className='m-auto w-full max-w-md space-y-5 rounded-2xl border border-white/10 bg-[#0b0b10] p-8 text-zinc-100 shadow-2xl'
			>
				<div className='text-center'>
					<h1 className='text-2xl font-semibold text-zinc-100'>Create Account</h1>
					<p className='mt-1 text-sm text-zinc-400'>Join OpenCourse and start learning.</p>
				</div>

				<div className='grid grid-cols-2 gap-3'>
					<div className='space-y-2'>
						<Label htmlFor='firstName' className='text-zinc-300'>
							First Name
						</Label>
						<Input
							id='firstName'
							type='text'
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							placeholder='Jane'
							className='border-white/10 bg-[#121218] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/50'
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='lastName' className='text-zinc-300'>
							Last Name
						</Label>
						<Input
							id='lastName'
							type='text'
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							placeholder='Doe'
							className='border-white/10 bg-[#121218] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/50'
						/>
					</div>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='username' className='text-zinc-300'>
						Username
					</Label>
					<Input
						id='username'
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder='janedoe'
						className='border-white/10 bg-[#121218] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/50'
						required
					/>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='email' className='text-zinc-300'>
						Email
					</Label>
					<Input
						id='email'
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='jane@example.com'
						className='border-white/10 bg-[#121218] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/50'
						required
					/>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='password' className='text-zinc-300'>
						Password
					</Label>
					<Input
						id='password'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='border-white/10 bg-[#121218] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/50'
						required
					/>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='confirmPassword' className='text-zinc-300'>
						Confirm Password
					</Label>
					<Input
						id='confirmPassword'
						type='password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className='border-white/10 bg-[#121218] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/50'
						required
					/>
				</div>

				<Button type='submit' className='w-full' disabled={loading}>
					{loading ? 'Creating account...' : 'Create Account'}
				</Button>

				<p className='text-center text-sm text-zinc-400'>
					Already have an account?{' '}
					<Link to='/login' className='font-medium text-indigo-400 hover:underline'>
						Sign in
					</Link>
				</p>
			</form>
		</section>
	);
}
