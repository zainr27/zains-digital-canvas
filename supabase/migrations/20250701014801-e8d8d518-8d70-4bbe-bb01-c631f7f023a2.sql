
-- Create a table to store contact form submissions
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied'))
);

-- Add Row Level Security (RLS) to the contact_messages table
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to insert contact messages (public contact form)
CREATE POLICY "Anyone can submit contact messages" 
  ON public.contact_messages 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy that only allows authenticated users to view messages (for admin purposes)
CREATE POLICY "Only authenticated users can view contact messages" 
  ON public.contact_messages 
  FOR SELECT 
  USING (auth.role() = 'authenticated');
