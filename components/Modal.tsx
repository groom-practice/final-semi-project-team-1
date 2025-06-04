import { useRouter } from "next/navigation";
import { ReactNode } from "react";

function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={() => router.back()}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[800px] overflow-y-scroll p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
