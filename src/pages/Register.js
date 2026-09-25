import { Link } from "react-router-dom";
import { AuthLayout } from "@/pages/AuthLayout";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const DiscordIcon = () => (
  <svg width="20" height="20" viewBox="0 0 127.14 96.36" fill="currentColor">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15ZM42.56,65.36c-5.36,0-9.8-4.83-9.8-10.74s4.36-10.74,9.8-10.74,9.85,4.83,9.8,10.74c0,5.91-4.4,10.74-9.8,10.74Zm42,0c-5.36,0-9.8-4.83-9.8-10.74s4.36-10.74,9.8-10.74,9.85,4.83,9.8,10.74c0,5.91-4.4,10.74-9.8,10.74Z"/>
  </svg>
);

export default function Register() {
  return (
    <AuthLayout
      title={"Create your account"}
      sub={"Start accepting crypto payments globally in minutes."}
      footer={
        <p>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-action-blue hover:underline underline-offset-4" data-testid="goto-login-link">
            Sign in
          </Link>
        </p>
      }
    >
      <div className="flex flex-col gap-sm">
        <button 
          onClick={() => window.location.href = `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}/api/merchant/auth/google`}
          className="flex items-center justify-center gap-md h-[48px] rounded-pill border border-border-light bg-canvas text-ink font-sans font-medium text-[14px] hover:bg-soft-stone transition-colors"
        >
          <GoogleIcon />
          Sign up with Google
        </button>

        <button 
          onClick={() => window.location.href = `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}/api/merchant/auth/discord`}
          className="flex items-center justify-center gap-md h-[48px] rounded-pill border border-transparent bg-[#5865F2] text-white font-sans font-medium text-[14px] hover:bg-[#4752C4] transition-colors"
        >
          <DiscordIcon />
          Sign up with Discord
        </button>
        
        <div className="relative flex items-center py-md my-xs">
          <div className="flex-grow border-t border-hairline"></div>
          <span className="flex-shrink-0 mx-md text-[12px] uppercase tracking-widest font-sans text-muted">Or continue with email</span>
          <div className="flex-grow border-t border-hairline"></div>
        </div>

        <form className="flex flex-col gap-sm" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-xs">
            <label className="text-[13px] font-medium text-ink">Work Email</label>
            <input type="email" placeholder="name@company.com" className="h-[44px] px-md rounded-xs border border-border-light bg-canvas text-[14px] focus:outline-none focus:border-form-focus transition-colors" />
          </div>
          <div className="flex flex-col gap-xs">
            <label className="text-[13px] font-medium text-ink">Company Name</label>
            <input type="text" placeholder="Acme Corp" className="h-[44px] px-md rounded-xs border border-border-light bg-canvas text-[14px] focus:outline-none focus:border-form-focus transition-colors" />
          </div>
          <button type="submit" className="h-[48px] rounded-pill bg-primary text-on-primary font-medium text-[14px] hover:bg-ink transition-colors mt-xs">
            Create Account
          </button>
          <p className="text-[12px] text-muted text-center mt-sm">
            By signing up, you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
