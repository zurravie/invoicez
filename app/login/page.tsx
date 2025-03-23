import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, signIn } from "../utils/auth";
import { SubmitButton } from "../components/SubmitButtons";
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await auth();

    if(session?.user) {
        redirect("/dashboard");
    }
    return (
        <>
            <div className="flex h-screen w-full items-center justify-center px-4">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Enter your email below to login in to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={async (formData) => {
                            "use server"
                            await signIn("nodemailer", formData)
                        }} className="flex flex-col gap-y-4">
                            <div className="flex flex-col gap-y-2">
                                <Label>Email</Label>
                                <Input 
                                name="email" 
                                type="email" 
                                required 
                                placeholder="hello@hello.com"></Input>
                            </div>
                            <SubmitButton/>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}