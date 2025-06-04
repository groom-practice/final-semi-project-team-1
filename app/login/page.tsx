// 서버 -> 클라이언트
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if(id === "admin" && pw === "adminPw") {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/");
    } else {
      setErr("아이디 또는 비밀번호가 올바르지 않습니다.")
    }
  }

  // zustand로 작업해야함! (useEffect는 임시)
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if( !loggedIn ){
      router.push("/login");
    }
  }, [])

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
      <button onClick={handleLogin} className="block mt-6 p-2 w-full rounded bg-blue-500">로그인</button>
    </div>
  )
}