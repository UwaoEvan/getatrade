import Image from "next/image";
import sofaIcon from "@/public/sofa-icon.svg";
import postIcon from "@/public/post-icon.svg";
import chatIcon from "@/public/chat-icon.svg";
import personIcon from "@/public/person-icon.svg";
import quoteIcon from "@/public/quote-icon.svg";
import poundIcon from "@/public/pound-icon.svg";

export default function HowItWorks() {
  return (
    <div className="bg-[#f5f7fa] py-16 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div className="text-left">
            <h2 className="text-3xl font-bold text-[#1f0e2b] mb-4">
              How MyBuilder works
            </h2>
            <p className="text-[#1f0e2b] text-md">
              <strong>Posting a job on MyBuilder is simple and free.</strong>{" "}
              Just tell us what you need, and our clever match-making process
              will help you choose the right person for your job with
              confidence.
            </p>
          </div>
          <Image src={sofaIcon} alt="sofa" width={80} height={80} />
        </div>
        <div className="grid md:grid-cols-3 gap-10 text-[#1f0e2b]">
          <div>
            <Image
              src={postIcon}
              alt="Post a job"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h3 className="font-bold text-lg mb-2">Post a job</h3>
            <p>
              Post your job in a few simple steps. We’ll let you know which
              tradespeople are interested.
            </p>
          </div>

          <div>
            <Image
              src={chatIcon}
              alt="See who's interested"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h3 className="font-bold text-lg mb-2">
              See who&apos;s interested
            </h3>
            <p>
              Our matching system identifies and alerts relevant tradespeople
              who can express interest.
            </p>
          </div>

          <div>
            <Image
              src={personIcon}
              alt="Start chats"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h3 className="font-bold text-lg mb-2">
              Start chats with tradespeople
            </h3>
            <p>
              Choose from local tradespeople. Contact details are shared only
              when you’re ready.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-10 mt-16 text-[#1f0e2b]">
          <div>
            <Image
              src={quoteIcon}
              alt="Getting the job done"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h4 className="font-semibold text-lg mb-1">Getting the job done</h4>
            <p>
              Once terms and pricing are agreed, your tradesperson gets to work.
            </p>
          </div>

          <div>
            <Image
              src={poundIcon}
              alt="Review experience"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h4 className="font-semibold text-lg mb-1">
              Review your experience
            </h4>
            <p>
              Leave a review to reward great work or highlight issues. Helps
              hold tradespeople accountable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
