"use client";
import Header from "@/components/Header";
import useWithdraw from "@/hooks/useWithdraw";
import classes from "@/styles/page.module.css";

export default function App() {
  const { handleWithdraw, isWithdrawing } = useWithdraw();
  return (
    <main>
      <Header />
      <div className={classes.container}>
        <button className={classes.btn} onClick={handleWithdraw}>
          {isWithdrawing ? "Withdrawing..." : "Withdraw From Lock"}
        </button>
      </div>
    </main>
  );
}
