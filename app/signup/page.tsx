"use client";

import Modal from "@/components/Modal";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthInput from "@/components/AuthInput";

function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPw, setConfirmPw] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSignup = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name,
          phoneNumber,
        }),
      });

      const data = await res.json();
      console.log("회원가입 응답", res.ok, data);
      if (!res.ok) {
        setErr(data.error || "회원가입 실패");
        return;
      }
      setSuccess(true);
      console.log(success);
    } catch {
      setErr("회원가입 중 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  const isBtnDisabled =
    email === "" ||
    password === "" ||
    confirmPw === "" ||
    name === "" ||
    phoneNumber === "";

  return (
    <div className="max-w-md mt-10 mx-auto p-4 border border-slate-200 rounded shadow-2xl">
      <h2 className="text-2xl font-semibold">회원가입</h2>
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
      <AuthInput
        label="re패스워드"
        value={confirmPw}
        onChange={(e) => setConfirmPw(e.target.value)}
        type="password"
      />
      <AuthInput
        label="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <AuthInput
        label="전화번호"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button
        onClick={handleSignup}
        disabled={isBtnDisabled}
        className={`block mt-6 p-2 w-full rounded ${
          isBtnDisabled
            ? "bg-gray-200 "
            : "bg-blue-500 text-white cursor-pointer"
        }`}
      >
        회원가입
      </button>

      {/* Modal */}
      {loading && (
        <Modal>
          <p className="text-center">회원가입 진행중</p>
          <Spinner />
        </Modal>
      )}

      {err && (
        <Modal>
          <div className="flex flex-col items-center gap-4 p-4">
            <p className="text-xl font-semibold text-red-600">{err}</p>
            <div className="flex flex-row items-center justify-center gap-4">
              <div
                className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
                onClick={() => window.location.reload()}
              >
                회원가입으로 돌아가기
              </div>
              <div
                className="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer"
                onClick={() => router.push("/")}
              >
                홈화면으로 돌아가기
              </div>
            </div>
          </div>
        </Modal>
      )}

      {success && (
        <Modal>
          <div className="flex flex-col items-center gap-4 p-4">
            <p className="text-xl font-semibold text-green-600">
              회원가입 성공
            </p>
            <div
              className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
              onClick={() => router.push("/login")}
            >
              로그인 하러 가기
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Signup;
