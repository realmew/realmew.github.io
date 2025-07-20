"use client";
import React from "react";
import { supabase } from "@/utils/supabaseClient";
import Image from "next/image";
type PollOption = {
  id: number;
  title: string;
  description: string;
  category: string;
  votes: number;
  album: string;
  cover?: string;
  tracklist?: string;
};

export default function EventsPage() {
  // Polling for live vote updates
  React.useEffect(() => {
	const interval = setInterval(async () => {
	  const { data, error } = await supabase.from('votes').select('*');
	  if (!error && data) {
		setVotes(data);
	  }
	}, 1000); // every 1 second
	return () => clearInterval(interval);
  }, []);
  // ...state declarations...
  // Timer state for countdown
  const [timeLeft, setTimeLeft] = React.useState<string>("");

  // ...all state and effect declarations...
  // Place error fallback here, after all state/effect declarations and just before main return
  // ...existing code...

  // ...all state and effect declarations...
  // Timer state for countdown
  // const [timeLeft, setTimeLeft] = React.useState<string>(""); // Remove duplicate
  // Voting deadline: August 1st, 2025
  const votingDeadline = React.useMemo(() => new Date('2025-08-01T00:00:00Z'), []);
  const [votingClosed, setVotingClosed] = React.useState(false);
  React.useEffect(() => {
	const checkClosed = () => {
	  setVotingClosed(new Date() >= votingDeadline);
	};
	checkClosed();
	const interval = setInterval(checkClosed, 1000 * 60); // check every minute
	return () => clearInterval(interval);
  }, [votingDeadline]);
  React.useEffect(() => {
	if (votingClosed) {
	  setTimeLeft("Poll closed");
	  return;
	}
	const updateTimer = () => {
	  const now = new Date();
	  const diff = votingDeadline.getTime() - now.getTime();
	  if (diff <= 0) {
		setTimeLeft("Poll closed");
		return;
	  }
	  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
	  const minutes = Math.floor((diff / (1000 * 60)) % 60);
	  const seconds = Math.floor((diff / 1000) % 60);
	  setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
	};
	updateTimer();
	const timer = setInterval(updateTimer, 1000);
	return () => clearInterval(timer);
  }, [votingClosed, votingDeadline]);
  // Poll titles order state
  const [pollTitlesOrder, setPollTitlesOrder] = React.useState<string[]>(["YANDHI", "SWISH", "BAD BITCH PLAYBOOK"]);
  const [votes, setVotes] = React.useState<PollOption[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [hasVoted, setHasVoted] = React.useState(false);
  const [showThankYou, setShowThankYou] = React.useState(false);
  type DebugInfo = { error: unknown, data: unknown } | null;
  const [debugInfo, setDebugInfo] = React.useState<DebugInfo>(null);
  // Fetch poll options from Supabase on mount
  React.useEffect(() => {
	const fetchPollOptions = async () => {
	  setLoading(true);
	  const { data, error } = await supabase
		.from('votes')
		.select('*');
	  setDebugInfo({ error, data });
	  if (!error && data) {
		setVotes(data);
		// On first load, set fixed poll titles order
		if (pollTitlesOrder.length === 3) {
		  // Ensure pollTitlesOrder matches available polls
		  const titles = ["Yandhi", "Swish", "Bad Bitch Playbook"];
		  setPollTitlesOrder(titles.filter(t => data.some(opt => opt.album && opt.album.trim().toLowerCase() === t.trim().toLowerCase())));
		}
	  }
	  setLoading(false);
	};
	fetchPollOptions();
  }, [pollTitlesOrder.length]);

  // ...existing code...

  function handleVote(optionId: number) {
	if (votingClosed) return;
	const isRemoving = selectedOption === optionId;
	setSelectedOption(isRemoving ? null : optionId);
	setHasVoted(!isRemoving);
	setShowThankYou(!isRemoving);
	// Persist vote in localStorage
	if (isRemoving) {
	  localStorage.removeItem('vsn_poll_vote');
	} else {
	  localStorage.setItem('vsn_poll_vote', String(optionId));
	}
	// Update vote in Supabase using API route
	const updateVote = async () => {
	  try {
		const res = await fetch('/api/votes', {
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify({ optionId, action: isRemoving ? 'decrement' : 'increment' })
		});
		const result = await res.json();
		if (result.votes) {
		  setVotes(result.votes);
		}
	  } catch {
		// Optionally handle error
	  }
	};
	updateVote();
  }

  if (loading) {
	return <div className="text-center py-12">Loading poll...</div>;
  }
  if (debugInfo && debugInfo.error) {
	return (
	  <div className="text-center py-12 text-red-600">
		Poll fetch error: {JSON.stringify(debugInfo.error)}
	  </div>
	);
  }

  // ...existing code...

  // Always show debug info below poll UI
  // Place error fallback here, after all state/effect declarations and just before main return
  if (debugInfo && debugInfo.error) {
	return (
	  <div className="text-center py-12 text-red-600">
		Poll fetch error: {JSON.stringify(debugInfo.error)}
	  </div>
	);
  }
  // ...existing code...
  return (
	<div>
	  {votingClosed && (
		<div className="w-full bg-red-100 text-red-800 py-4 text-center font-bold text-lg">
		  Voting is now closed. Thank you for participating!
		</div>
	  )}
	  <div className="w-full bg-transparent py-4">
		<div className="max-w-4xl mx-auto px-6 py-2 text-center">
		  <div className="bg-gray-100 text-gray-700 rounded-lg p-3 mb-4 text-sm font-semibold border border-gray-300">
			Note: All tracklists are subject to change.
		  </div>
		</div>
	  </div>
	  <div className="w-full bg-white/40 backdrop-blur-sm border-b border-gray-200">
		<div className="max-w-4xl mx-auto px-6 py-2 text-center">
		  <div className="flex items-center justify-center gap-4 mb-2">
			<h1 className="text-4xl font-bold text-gray-900">Community Poll</h1>
			{!votingClosed && (
			  <div className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 flex items-center gap-2">
				⏱️ Voting open
				<span className="ml-2 font-mono text-xs bg-white/60 px-2 py-1 rounded">
				  {timeLeft}
				</span>
			  </div>
			)}
		  </div>
		  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
			Your voice shapes our direction. Choose the path that resonates with you.
		  </p>
		  {hasVoted && (
			<div className="mt-2 inline-flex items-center px-4 py-2 bg-black/10 rounded-full text-gray-800 font-medium">
			  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
			  Vote Recorded
			</div>
		  )}
		</div>
	  </div>
	  <div className="max-w-4xl mx-auto px-6 py-12 pb-32">
		<div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
		  <p className="text-gray-700 text-center">
			{hasVoted
			  ? "Click your selected option to remove your vote, or click another option to change your vote."
			  : "Select your preferred option below. You can change or remove your vote at any time before the timer expires."}
		  </p>
		</div>
		<div className="space-y-4">
  {votes.length === 0 ? (
  <div className="text-center text-gray-500 py-12">No poll options available. Please add options in Supabase.</div>
  ) : (
  <div className="flex flex-row gap-6 justify-center items-stretch">
	{pollTitlesOrder.map(title => {
	  const option = votes.find(opt => opt.album && opt.album.trim().toLowerCase() === title.trim().toLowerCase());
	  if (!option) return null;
	  const isSelected = hasVoted && selectedOption === option.id;
	  const canClick = (!hasVoted || isSelected) && !votingClosed;
	  return (
		<div
		  key={option.id}
		  className={`flex flex-col items-center justify-between w-64 bg-white/80 backdrop-blur-sm rounded-xl border transition-all duration-300 px-4 py-6 ${
			isSelected
			  ? "border-black shadow-lg cursor-pointer"
			  : canClick
				? "border-gray-300 hover:border-gray-400 hover:shadow-md cursor-pointer"
				: "border-gray-300 opacity-60 cursor-not-allowed"
		  }`}
		  onClick={() => canClick && handleVote(option.id)}
		>
		  {option.cover ? (
			<Image
			  src={option.cover}
			  alt={option.title ? option.title : 'Poll cover'}
			  width={96}
			  height={96}
			  className="object-cover rounded-lg mb-3"
			/>
		  ) : null}
		  <h2 className="text-lg font-bold text-gray-900 mb-1 text-center">{option.title}</h2>
	  <h2 className="text-lg font-bold text-gray-900 mb-1 text-center">{option.album}</h2>
		  {option.tracklist && (
			<div className="text-xs text-gray-500 mb-2 text-center whitespace-pre-line">{option.tracklist}</div>
		  )}
		  <div className="font-semibold text-blue-600 mt-2">Votes: {option.votes}</div>
		  {isSelected && (
			<div className="mt-3 text-sm text-gray-500 italic text-center">
			  Click again to remove your vote
			</div>
		  )}
		</div>
	  );
	})}
  </div>
  )}
		</div>
		{hasVoted && (
		  <div className="mt-12 bg-white border border-gray-200 rounded-xl p-6">
			<h3 className="text-lg font-semibold text-gray-900 mb-4">Voting Summary</h3>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
			  <div className="p-4 bg-gray-50 rounded-lg">
				<div className="text-2xl font-bold text-blue-600">{votes.reduce((sum: number, opt: PollOption) => sum + (opt.votes || 0), 0)}</div>
				<div className="text-sm text-gray-600">Total Votes</div>
			  </div>
			  <div className="p-4 bg-gray-50 rounded-lg">
		<div className="text-2xl font-bold text-green-600">
		  {(() => {
			const selected = votes.find(v => v.id === selectedOption);
			if (selected && selected.album) {
			  return selected.album;
			}
			return 'No selection';
		  })()}
		</div>
				<div className="text-sm text-gray-600">Your Choice</div>
			  </div>
			  <div className="p-4 bg-gray-50 rounded-lg">
				<div className="text-2xl font-bold text-purple-600">Live</div>
				<div className="text-sm text-gray-600">Results Status</div>
			  </div>
			</div>
		  </div>
		)}
		{!hasVoted && (
		  <div className="mt-12 text-center">
			<p className="text-gray-600 mb-4">
			  Your voice matters. Make your selection above to contribute to our community direction.
			</p>
			<div className="inline-flex items-center text-sm text-gray-500">
			  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
				<path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
			  </svg>
			  <span>Voting is secure and anonymous</span>
			</div>
		  </div>
		)}
		{showThankYou && hasVoted && (
		  <div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="bg-white rounded-xl shadow-2xl border-4 border-black p-8 max-w-md mx-auto text-center">
			  <h2 className="text-2xl font-bold mb-4 text-black">Thank you for voting!</h2>
			  <p className="text-gray-700 mb-2">Your vote has been recorded.</p>
			  <p className="text-gray-700 mb-4">To unvote, click your selected option again.</p>
			  <button
				className="mt-2 px-6 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
				onClick={() => setShowThankYou(false)}
			  >
				Close
			  </button>
			</div>
			<div className="fixed inset-0 bg-black/40 z-40" onClick={() => setShowThankYou(false)}></div>
		  </div>
		)}
	</div>
	{/* Debug block removed as requested */}
  </div>
  );
}
