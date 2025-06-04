// 서버 -> 클라이언트
"use client";

import AuthInput from "@/components/AuthInput";
import Modal from "@/components/Modal";
import Spinner from "@/components/Spinner";
import useAuthStore from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log("로그인 응답", res.ok, data);
      if (!res.ok) {
        setErr(data.error || "로그인 실패");
        return;
      }
      setSuccess(true);
      login();
      console.log(success);
    } catch {
      setErr("로그인 중 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  const isLoginBtnDisabled = email === "" || password === "";
  return (
    <div className="max-w-md mt-10  mx-auto p-4 border border-slate-200 rounded shadow-2xl">
      <h2 className="text-2xl font-semibold">로그인</h2>
      <AuthInput
        label="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <AuthInput
        label="패스워드"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <button
        onClick={handleLogin}
        disabled={isLoginBtnDisabled}
        className={`block mt-6 p-2 w-full rounded text-white ${
          isLoginBtnDisabled ? "bg-gray-200" : "bg-blue-500 cursor-pointer"
        }`}
      >
        로그인
      </button>

      {/* Modal */}
      {loading && (
        <Modal>
          <p className="text-center">로그인 진행중</p>
          <Spinner />
        </Modal>
      )}

      {err && (
        <Modal>
          <div className="flex flex-col items-center gap-4 p-4">
            <p className="text-xl font-semibold text-red-600">{err}</p>
            <div
              className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
              onClick={() => router.push("/")}
            >
              홈으로 돌아가기
            </div>
          </div>
        </Modal>
      )}

      {success && (
        <Modal>
          <div className="flex flex-col items-center gap-4 p-4">
            <p className="text-xl font-semibold text-green-600">로그인 성공</p>
            <div
              className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
              onClick={() => router.push("/")}
            >
              홈으로 돌아가기
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
