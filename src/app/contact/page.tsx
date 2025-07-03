
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AdPlaceholder } from "@/components/ad-placeholder";
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      toast({
        title: "Incomplete Form",
        description: "Please fill out all fields before sending.",
        variant: "destructive",
      });
      return;
    }

    const mailtoSubject = encodeURIComponent(subject);
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:joeysalakhaeoxs@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline text-primary">
          Get in Touch
        </h1>
        <p className="mt-4 text-xl text-foreground/80 max-w-3xl mx-auto text-balance">
          We&apos;d love to hear from you! Your feedback is vital for improving FinanceForward. Whether you have a question, a feature suggestion, or a partnership inquiry, please don&apos;t hesitate to reach out.
        </p>
      </header>

      <AdPlaceholder variant="banner" label="Ad Before Contact Form" className="mb-8" />

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-primary">Send us a Message</CardTitle>
            <CardDescription>Fill out the form below. We do our best to respond to all inquiries within 2 business days.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-foreground">Full Name</Label>
                <Input type="text" name="name" id="name" autoComplete="name" required className="mt-1" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-foreground">Email Address</Label>
                <Input type="email" name="email" id="email" autoComplete="email" required className="mt-1" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="subject" className="block text-sm font-medium text-foreground">Subject</Label>
                <Input type="text" name="subject" id="subject" required className="mt-1" value={subject} onChange={(e) => setSubject(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="message" className="block text-sm font-medium text-foreground">Your Message</Label>
                <Textarea name="message" id="message" rows={4} required className="mt-1" placeholder="Let us know how we can help..." value={message} onChange={(e) => setMessage(e.target.value)} />
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
                    <CardTitle className="text-2xl font-headline text-primary">Contact Information</CardTitle>
                     <CardDescription>For direct inquiries, please use the email address below.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Mail className="h-6 w-6 text-primary" />
                        <a href="mailto:joeysalakhaeoxs@gmail.com" className="text-foreground/90 hover:text-primary">joeysalakhaeoxs@gmail.com</a>
                    </div>
                     <p className="text-sm text-muted-foreground">
                        Ideal for general questions, support requests, and business-related communication.
                    </p>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline text-primary">Connect With Us</CardTitle>
                     <CardDescription>Follow our journey and connect with our team on social media.</CardDescription>
                </CardHeader>
                <CardContent className="flex space-x-6">
                    <Link href="https://www.linkedin.com/in/joey-salakha0004" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-muted-foreground hover:text-primary"><Linkedin className="h-7 w-7" /></Link>
                    <Link href="https://github.com/JonaDmello5/FinanceForward" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-muted-foreground hover:text-primary"><Github className="h-7 w-7" /></Link>
                </CardContent>
            </Card>
        </div>
      </div>

      <AdPlaceholder variant="leaderboard" label="Ad After Contact Form" className="mt-12" />
    </div>
  );
}
