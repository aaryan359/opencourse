import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { loginUser } from '@/redux/slice/authSlice';

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const loading = useAppSelector((state) => state.auth.loading);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!email.trim() || !password) {
			toast.error('Email and password are required.');
			return;
		}

		try {
			await dispatch(loginUser({ email: email.trim(), password })).unwrap();
			toast.success('Welcome back!');
			navigate('/');
		} catch (error: unknown) {
			const message =
				error instanceof Error ? error.message : 'Login failed. Please try again.';
			toast.error(message);
		}
	};

	return (
		<section className='flex min-h-screen bg-[#050506] px-4 py-16 md:py-24'>
			<div className='m-auto grid w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b10] shadow-2xl md:grid-cols-2'>
				<div className='relative hidden min-h-120 md:block'>
					<img
						src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
						alt='Developers collaborating'
						className='h-full w-full object-cover'
					/>
					<div className='absolute inset-0 bg-black/30' />
					<div className='absolute bottom-6 left-6 right-6 text-white'>
						<p className='text-sm opacity-90'>OpenCourse</p>
						<h2 className='text-2xl font-semibold'>Learn from community, build with confidence.</h2>
					</div>
				</div>

				<form onSubmit={onSubmit} className='space-y-5 p-8 text-zinc-100 md:p-10'>
					<div>
						<h1 className='text-2xl font-semibold text-zinc-100'>Sign In</h1>
						<p className='mt-1 text-sm text-zinc-400'>Welcome back to OpenCourse.</p>
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
							placeholder='you@example.com'
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
							placeholder='Enter your password'
							className='border-white/10 bg-[#121218] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/50'
							required
						/>
					</div>

					<Button type='submit' className='w-full' disabled={loading}>
						{loading ? 'Signing in...' : 'Sign In'}
					</Button>

					<p className='text-center text-sm text-zinc-400'>
						Don&apos;t have an account?{' '}
						<Link to='/register' className='font-medium text-indigo-400 hover:underline'>
							Create one
						</Link>
					</p>
				</form>
			</div>
		</section>
	);
}
