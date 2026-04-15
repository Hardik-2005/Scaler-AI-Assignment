import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center p-4 py-16">
      <div className="bg-white rounded-md shadow-lg overflow-hidden flex max-w-4xl w-full">
        {/* Flipkart Style Left Panel */}
        <div className="hidden md:flex bg-[#2874f0] text-white flex-col w-[35%] p-10 justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <p className="text-lg text-gray-200">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>
          <div className="bg-white/20 p-6 rounded-md">
            <h3 className="font-semibold text-lg italic">Flipkart</h3>
          </div>
        </div>

        {/* Clerk Sign In Form Right Panel */}
        <div className="w-full md:w-[65%] flex justify-center items-center py-8">
          <SignIn 
            appearance={{
              elements: {
                rootBox: "w-full flex justify-center",
                card: "shadow-none w-full max-w-md",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                formButtonPrimary: "bg-[#fb641b] hover:bg-[#ff5600] text-white font-bold w-full rounded-sm h-12 text-lg",
                socialButtonsBlockButtonText: "font-semibold",
                socialButtonsBlockButton: "rounded-sm h-12 border-gray-300",
                formFieldInput: "h-12 border-b-2 border-t-0 border-r-0 border-l-0 border-gray-300 rounded-none focus:ring-0 focus:border-[#2874f0] bg-transparent outline-none",
                formFieldLabel: "text-gray-500 text-sm font-semibold",
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}