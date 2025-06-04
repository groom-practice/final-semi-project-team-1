// 서버 -> 클라이언트
"use client";

import useAuthStore from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Login() {
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    if(id === "admin" && pw === "adminPw") {
      login();
      router.push("/");
    } else {
      setErr("아이디 또는 비밀번호가 올바르지 않습니다.")
    }
  }

  return (
    <div className="max-w-md mt-10  mx-auto p-4 border border-slate-200 rounded shadow-2xl">
      <h2 className="text-2xl font-semibold">로그인</h2>
      <input 
        type="text"
        placeholder="아이디를 입력해주세요"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="block mt-6 p-2 w-full border border-slate-200 rounded"
      />
      <input 
        type="password" 
        value={pw}
        placeholder="비밀번호를 입력해주세요"
        onChange={(e) => setPw(e.target.value)}
        className="block mt-4 p-2 w-full border border-slate-200 rounded"/>
      {err && <p className="text-red-500 mt-3">{err}</p>}
      <button 
        onClick={handleLogin} 
        disabled={ id === "" || pw === ""}
        className={`block mt-6 p-2 w-full rounded text-white ${ id === "" || pw === "" ? "bg-gray-200" : "bg-blue-500 cursor-pointer"}`} 
      >로그인</button>
    </div>
  )
}