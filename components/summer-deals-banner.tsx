import Link from "next/link"
import styles from "./summer-deals-banner.module.css"

export function SummerDealsBanner() {
  return (
    <div className={styles.banner}>
      {/* LEFT: Summer Deals */}
      <div className={`${styles.panel} ${styles.panelSummer}`}>
        <div className={`${styles.badge} ${styles.badgeMagenta}`}>★ New This Summer</div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/summer/summer-logo.png" alt="Concourse Summer 2026" className={styles.summerLogo} />

        <hr className={styles.summerRule} />
        <div className={styles.summerDates}>May 26 – August 31</div>
        <div className={styles.summerTagline}>
          Weekly deals on bowling, drinks &amp; family fun — every day, all summer long.
        </div>

        <Link href="/events" className={`${styles.cta} ${styles.ctaMagenta}`}>
          View Deals <span className={styles.ctaArrow}>→</span>
        </Link>
      </div>

      {/* Sports Team Party package temporarily disabled — uncomment to bring back the right panel.
      <div className={styles.divider} />

      <div className={`${styles.panel} ${styles.panelParty}`}>
        <div className={`${styles.badge} ${styles.badgeGreen}`}>★ Available May 1st</div>
        <div className={styles.title}>
          Sports Team
          <br />
          <span className={styles.green}>Party Package</span>
        </div>
        <div>
          <div className={`${styles.price} ${styles.priceGreen}`}>$225</div>
          <div className={styles.priceSub}>
            Per Pair of Lanes <br /> Weekend Start times: 11:30am - 2:30pm
          </div>
        </div>
        <div className={styles.details}>
          <span className={`${styles.detail} ${styles.detailGreen}`}>12 Bowlers</span>
          <span className={`${styles.detail} ${styles.detailGreen}`}>2 Lanes · 90 Minutes</span>
          <span className={`${styles.detail} ${styles.detailGreen}`}>2 Pizzas + Sodas Included</span>
        </div>
        <a href="tel:+17146662695" className={`${styles.cta} ${styles.ctaGreen}`}>
          Call for Availability <span className={styles.ctaArrow}>→</span>
        </a>
        <span className={styles.time}>(714) 666-2695</span>
      </div>
      */}
    </div>
  )
}
