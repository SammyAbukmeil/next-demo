import styles from "@/app/ui/home.module.css";

export default function Home() {
  return (
    <main className="text-center m-2 flex justify-center">
      <div className={styles.logo}></div>
      <h1>Acme Media</h1>
    </main>
  )
}
