"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import Input from '@/components/Input';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setError('');
        setIsLoading(true);

        // This is a placeholder for actual authentication logic
        // In a real implementation, you would connect to an auth service
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Placeholder success logic - in a real app, check credentials
            console.log('Sign in successful');
            router.push('/');
        } catch (error) {
            console.error('Sign in error:', error);
            setError('Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="form-container">
                <h1 className="page-title">Sign In</h1>

                <form onSubmit={handleSubmit} className="auth-form">
                    <Input
                        label="Email Address"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />

                    {error && <div className="error-message">{error}</div>}

                    <div className="form-actions">
                        <Button
                            color="blue"
                            size="md"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? <LoadingSpinner size="small" color="white" /> : 'Sign In'}
                        </Button>
                    </div>

                    <p className="auth-redirect">
                        Don't have an account?{' '}
                        <Link href="/signup" className="redirect-link">
                            Sign up here
                        </Link>
                    </p>
                </form>
            </div>

            <style jsx>{`
        .auth-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 80vh;
          padding: 2rem;
          animation: fadeIn 0.5s ease-out;
        }
        
        .form-container {
          width: 100%;
          max-width: 450px;
          padding: 2.5rem;
          border-radius: 12px;
          background-color: var(--card-bg);
          border: 1px solid var(--color-blue-dark);
          box-shadow: var(--shadow-md);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          animation: slideUp 0.6s ease-out;
        }
        
        .form-container:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: var(--color-blue-light);
        }
        
        .page-title {
          font-family: var(--font-ibm-plex-mono);
          color: var(--color-blue);
          text-align: center;
          font-size: 2.2rem;
          margin-bottom: 2rem;
          position: relative;
        }
        
        .page-title::after {
          content: "";
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background-color: var(--color-blue);
          border-radius: 2px;
        }
        
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .form-actions {
          margin-top: 1rem;
          display: flex;
          justify-content: center;
        }
        
        .error-message {
          background-color: rgba(255, 0, 0, 0.1);
          color: #ff5555;
          padding: 0.75rem;
          border-radius: 6px;
          border: 1px solid rgba(255, 0, 0, 0.2);
          text-align: center;
          animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        
        .auth-redirect {
          text-align: center;
          margin-top: 1.5rem;
          color: var(--foreground);
          opacity: 0.8;
          font-family: var(--font-roboto);
        }
        
        .redirect-link {
          color: var(--color-blue);
          text-decoration: none;
          position: relative;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .redirect-link:hover {
          opacity: 0.8;
        }
        
        .redirect-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: var(--color-blue);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        
        .redirect-link:hover::after {
          transform: scaleX(1);
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .form-container {
            padding: 2rem;
          }
          
          .page-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
        </div>
    );
}