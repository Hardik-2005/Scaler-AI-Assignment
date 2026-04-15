import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center p-4 py-16">
      <div className="bg-white rounded-md shadow-lg flex w-full max-w-[850px] overflow-hidden">
        {/* Flipkart Style Left Panel */}
        <div className="hidden md:flex bg-[#2874f0] text-white flex-col w-[40%] p-10 justify-between relative">
          <div>
            <h1 className="text-3xl font-semibold mb-4 text-white tracking-wide leading-tight">Looks like you're new here!</h1>
            <p className="text-lg text-[#dbdbdb] font-medium leading-relaxed">
              Sign up with your details to get started
            </p>
          </div>
          {/* Decorative element */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-32 opacity-30 bg-cover bg-center rounded-sm">
             <div className="w-full text-center text-5xl italic font-bold text-white tracking-widest leading-10 uppercase">Flipkart</div>
          </div>
        </div>

        {/* Clerk Sign Up Form Right Panel */}
        <div className="w-full md:w-[60%] flex justify-center items-center py-10 px-8">
          <SignUp 
            appearance={{
              elements: {
                rootBox: "w-full flex justify-center",
                card: "shadow-none w-full max-w-sm px-0 py-0 m-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                formButtonPrimary: "bg-[#fb641b] hover:bg-[#eb5e1b] text-white font-bold w-full rounded-sm h-[48px] text-[15px] shadow-sm transition-all shadow-[#fb641b]/20",
                socialButtonsBlockButtonText: "font-semibold text-gray-700",
                socialButtonsBlockButton: "rounded-sm h-12 border border-[#DBDBDB] hover:bg-[#F2F2F2] transition-colors bg-white",
                formFieldInput: "h-[45px] border-b border-[#DBDBDB] border-t-0 border-r-0 border-l-0 rounded-none focus:ring-0 focus:border-[#2874f0] bg-transparent outline-none px-0 text-base transition-colors placeholder:text-transparent",
                formFieldLabel: "text-[#878787] text-[12px] font-medium tracking-wide mb-1 px-1",
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}