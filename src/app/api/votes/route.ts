import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabaseClient';

// GET - Fetch current votes from Supabase
export async function GET() {
  const { data, error } = await supabase.from('votes').select('*');
  if (error) {
    return NextResponse.json({ error: 'Failed to fetch votes' }, { status: 500 });
  }
  return NextResponse.json({ votes: data });
}

// POST - Update votes in Supabase
export async function POST(request: NextRequest) {
  try {
    const { optionId, action } = await request.json();
    // Get current votes for the option
    const { data, error } = await supabase.from('votes').select('votes').eq('id', optionId).single();
    if (error || !data) {
      return NextResponse.json({ error: 'Option not found' }, { status: 404 });
    }
    let newVotes = data.votes;
    if (action === 'increment') {
      newVotes++;
    } else if (action === 'decrement') {
      newVotes = Math.max(0, newVotes - 1);
    }
    const { error: updateError } = await supabase.from('votes').update({ votes: newVotes }).eq('id', optionId);
    if (updateError) {
      return NextResponse.json({ error: 'Failed to update votes' }, { status: 500 });
    }
    // Return updated votes
    const { data: allVotes } = await supabase.from('votes').select('*');
    return NextResponse.json({ votes: allVotes });
  } catch {
    return NextResponse.json({ error: 'Failed to update votes' }, { status: 500 });
  }
}

// PUT - Reset all votes to zero
export async function PUT() {
  try {
    const { error } = await supabase.from('votes').update({ votes: 0 });
    if (error) {
      return NextResponse.json({ error: 'Failed to reset votes' }, { status: 500 });
    }
    const { data } = await supabase.from('votes').select('*');
    return NextResponse.json({ votes: data });
  } catch {
    return NextResponse.json({ error: 'Failed to reset votes' }, { status: 500 });
  }
}
