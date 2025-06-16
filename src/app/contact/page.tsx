
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AdPlaceholder } from "@/components/ad-placeholder";
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import Link from "next/link";

// TODO: Implement form submission logic, possibly with a server action.
// async function submitContactForm(formData: FormData) {
//   "use server";
//   const name = formData.get("name");
//   const email = formData.get("email");
//   const subject = formData.get("subject");
//   const message = formData.get("message");
//   console.log({ name, email, subject, message });
//   // Add logic to send email or save to database
// }

export default function ContactPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline text-primary">
          Contact Us
        </h1>
        <p className="mt-4 text-xl text-foreground/80 max-w-2xl mx-auto text-balance">
          We&apos;d love to hear from you! Whether you have a question, feedback, or a partnership inquiry, feel free to reach out.
        </p>
      </header>

      <AdPlaceholder variant="banner" label="Ad Before Contact Form" className="mb-8" />

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-primary">Send us a Message</CardTitle>
            <CardDescription>Fill out the form below and we&apos;ll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <form action={submitContactForm} className="space-y-6"> */}
            <form action="#" method="POST" className="space-y-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-foreground">Full Name</Label>
                <Input type="text" name="name" id="name" autoComplete="name" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-foreground">Email Address</Label>
                <Input type="email" name="email" id="email" autoComplete="email" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="subject" className="block text-sm font-medium text-foreground">Subject</Label>
                <Input type="text" name="subject" id="subject" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="message" className="block text-sm font-medium text-foreground">Message</Label>
                <Textarea name="message" id="message" rows={4} required className="mt-1" />
              </div>
              <div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Send Message <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline text-primary">Other Ways to Reach Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Mail className="h-6 w-6 text-primary" />
                        <a href="mailto:support@financeforward.example.com" className="text-foreground/90 hover:text-primary">support@financeforward.example.com</a>
                    </div>
                     <p className="text-sm text-muted-foreground">
                        For general inquiries and support, please email us directly. We aim to respond within 24-48 business hours.
                    </p>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline text-primary">Connect on Social Media</CardTitle>
                </CardHeader>
                <CardContent className="flex space-x-6">
                    <Link href="https://in.linkedin.com/in/joey-salakha0004" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-muted-foreground hover:text-primary"><Linkedin className="h-7 w-7" /></Link>
                    <Link href="https://github.com/jonadmello5" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-muted-foreground hover:text-primary"><Github className="h-7 w-7" /></Link>
                </CardContent>
            </Card>
        </div>
      </div>

      <AdPlaceholder variant="leaderboard" label="Ad After Contact Form" className="mt-12" />
    </div>
  );
}
