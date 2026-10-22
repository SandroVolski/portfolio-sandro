import ScrollReveal from '../components/reactbits/ScrollReveal/ScrollReveal';
import CountUp from '../components/reactbits/CountUp/CountUp';
import CodeCard from '../components/visuals/CodeCard';
import type { Profile, Stat } from '../content';
import './About.css';

interface Props {
  profile: Profile;
  stats: Stat[];
  reduced: boolean;
}

export default function About({ profile, stats, reduced }: Props) {
  const [lead] = profile.intro;
  return (
    <section id="sobre" className="about" aria-labelledby="about-title">
      <div className="wrap about__grid">
        <div className="about__side">
          <h2 id="about-title" className="h-section about__title">
            Sobre
          </h2>
          <CodeCard role={profile.role} place="Irati, PR" products={stats[0]?.value ?? 3} reduced={reduced} />
        </div>

        <div className="about__body">
          <ScrollReveal
            baseOpacity={0.12}
            enableBlur
            blurStrength={6}
            baseRotation={0}
            stagger={0.04}
            containerClassName="about__lead-wrap"
            textClassName="about__lead"
          >
            {lead}
          </ScrollReveal>

          <ul className="about__stats">
            {stats.map((s) => (
              <li key={s.label} className="about__stat">
                <CountUp to={s.value} duration={1.6} className="about__num" />
                <span className="about__stat-label">{s.label}</span>
                <span className="about__stat-detail muted">{s.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
