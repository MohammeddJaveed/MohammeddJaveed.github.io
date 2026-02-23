"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BalloonFall } from "@/components/balloon-fall";
import { FluidBackground } from "@/components/fluid-background";
import {
  achievements,
  certifications,
  contactInfo,
  education,
  marqueeSkills,
  professionalExperience,
  projects,
  skillCategories,
  socialLinks,
} from "@/lib/portfolio-data";

type FormStatus = "idle" | "sending" | "sent" | "error";
type ThemeMode = "light" | "dark";

const FORM_ENDPOINT = "https://formspree.io/f/xgvnjllv";

export default function HomePage() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState<ThemeMode>("light");

  const year = useMemo(() => new Date().getFullYear(), []);
  const coreSkillSections = useMemo(
    () =>
      skillCategories.filter((category) =>
        [
          "Mobile",
          "Frontend",
          "Backend",
          "Databases",
          "Cloud & DevOps",
        ].includes(category.title),
      ),
    [],
  );
  const toolsPractices = useMemo(
    () =>
      skillCategories.find(
        (category) => category.title === "Tools & Practices",
      ),
    [],
  );

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 40) {
        setHeaderVisible(true);
      } else {
        setHeaderVisible(y < lastY);
      }
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 2, 100);
        if (next === 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 400);
        }
        return next;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  function goTo(id: string) {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    try {
      setFormStatus("sending");
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        setFormStatus("error");
        return;
      }

      form.reset();
      setFormStatus("sent");
    } catch {
      setFormStatus("error");
    }
  }

  if (loading) {
    return (
      <div className="loader-screen">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="loader-title"
        >
          Mohammed Javeed
        </motion.h1>
        <p className="loader-sub">Building a premium portfolio experience...</p>
        <p className="loader-progress">{progress}%</p>
      </div>
    );
  }

  return (
    <main className="ref-shell" data-theme={theme}>
      <FluidBackground />
      <BalloonFall />

      <header className={`ref-header ${headerVisible ? "show" : "hide"}`}>
        <div className="container ref-nav-row">
          <button className="logo-btn" onClick={() => goTo("hero")}>
            MJ
          </button>

          <button
            className="menu-btn"
            onClick={() => setMenuOpen((value) => !value)}
          >
            Menu
          </button>

          <nav className="desktop-nav">
            <button onClick={() => goTo("about")}>About</button>
            <button onClick={() => goTo("skills")}>Skills</button>
            <button onClick={() => goTo("certificates")}>Certificates</button>
            <button onClick={() => goTo("experience")}>Experience</button>
            <button onClick={() => goTo("projects")}>Projects</button>
            <button onClick={() => goTo("education")}>Education</button>
            <button onClick={() => goTo("contact")}>Contact</button>
            <button
              className="theme-toggle"
              onClick={() =>
                setTheme((prev) => (prev === "light" ? "dark" : "light"))
              }
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </nav>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => goTo("about")}>About</button>
          <button onClick={() => goTo("skills")}>Skills</button>
          <button onClick={() => goTo("certificates")}>Certificates</button>
          <button onClick={() => goTo("experience")}>Experience</button>
          <button onClick={() => goTo("projects")}>Projects</button>
          <button onClick={() => goTo("education")}>Education</button>
          <button onClick={() => goTo("contact")}>Contact</button>
          <button
            className="theme-toggle"
            onClick={() =>
              setTheme((prev) => (prev === "dark" ? "light" : "dark"))
            }
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      )}

      <section id="hero" className="hero-ref">
        <div className="hero-gradient" />
        <div className="hero-cloud cloud-one" />
        <div className="hero-cloud cloud-two" />

        <div className="container hero-ref-grid">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="hero-chip">Software Engineer</p>
            <h1>
              Hi, I&apos;m Mohammed Javeed
              <span>Software Engineer & Full-Stack Developer</span>
            </h1>
            <p className="hero-description">
              I build modern mobile and web applications that scale, perform,
              and delight users. I blend creative UI/UX with robust backend
              logic using React, React Native, Django, and SwiftUI.
            </p>

            <div className="hero-actions">
              <button className="dark-btn" onClick={() => goTo("projects")}>
                View Projects
              </button>
              <button className="text-btn" onClick={() => goTo("contact")}>
                Contact Me
              </button>
            </div>
          </motion.div>

          <motion.aside
            className="hero-side-panel"
            initial={{ opacity: 0, y: 28, x: 16 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            <p className="hero-side-eyebrow">Quick Snapshot</p>
            <h3>Dublin, Ireland</h3>
            <p>
              Building production-ready mobile and web apps with strong frontend
              craft and reliable backend architecture.
            </p>
            <div className="hero-side-chips">
              <span>React Native</span>
              <span>SwiftUI</span>
              <span>Django</span>
              <span>Node.js</span>
              <span>Angular</span>
              <span>CI/CD</span>
            </div>
            <div className="hero-side-links">
              <a
                href="https://github.com/MohammeddJaveed"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/mohammed-javee-"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </motion.aside>
        </div>
      </section>

      <section id="about" className="section about-ref">
        <div className="container">
          <h2>
            About <span>Me</span>
          </h2>
          <div className="about-grid">
            <article className="about-card large">
              <p>
                I&apos;m a passionate Software Engineer based in Dublin,
                Ireland, specializing in building scalable and well-architected
                applications across mobile and web platforms. My expertise spans
                from React & React Native to SwiftUI, Django, Node.js, and
                Angular. I focus on clean code, user experience, and real-world
                impact.
              </p>
              <p>
                I enjoy taking ideas from concept to production and solving
                problems with elegant and efficient software solutions. I thrive
                in collaborative environments and continuously push myself to
                learn and adopt new technologies.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="skills" className="section testimonials-ref">
        <div className="container">
          <h2>
            Skills & <span>Technologies</span>
          </h2>
          <div className="skills-creative-wrap">
            <div className="skills-ambient skills-ambient-one" />
            <div className="skills-ambient skills-ambient-two" />
            <div className="skills-ambient skills-ambient-three" />

            <div className="skills-showcase">
              {coreSkillSections.map((category, index) => (
                <motion.article
                  key={category.title}
                  className="skill-creative-card"
                  initial={{
                    opacity: 0,
                    y: 36,
                    rotate: index % 2 === 0 ? -2 : 2,
                  }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <p className="skill-card-index">0{index + 1}</p>
                  <h3>{category.title}</h3>
                  <ul>
                    {category.items.map((item) => (
                      <li key={`${category.title}-${item}`}>
                        <span>✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>

            <div className="skills-scatter-zone">
              {toolsPractices && (
                <div className="scatter-group tools-explode">
                  <h3>{toolsPractices.title}</h3>
                  <div className="scatter-chips">
                    {toolsPractices.items.map((item, index) => {
                      const total = toolsPractices.items.length;
                      const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
                      const radius = 26 + (index % 3) * 10;
                      const offsetX = Math.cos(angle) * radius;
                      const offsetY = Math.sin(angle) * radius;
                      const rotate =
                        (index % 2 === 0 ? 1 : -1) * (8 + (index % 4) * 2);

                      return (
                        <span
                          key={`${toolsPractices.title}-${item}`}
                          className="scatter-chip tool-chip"
                          style={
                            {
                              "--explode-x": `${offsetX.toFixed(1)}px`,
                              "--explode-y": `${offsetY.toFixed(1)}px`,
                              "--explode-rot": `${rotate}deg`,
                            } as React.CSSProperties
                          }
                        >
                          {item}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="certificates" className="section certificates-ref">
        <div className="container">
          <h2>
            Certifications <span>& Achievements</span>
          </h2>
          <div className="certificates-grid">
            {certifications.map((certificate, index) => (
              <motion.article
                key={certificate.title}
                className="certificate-card"
                initial={{
                  opacity: 0,
                  y: 36,
                  rotate: index % 2 === 0 ? -1 : 1,
                }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <p className="certificate-year">{certificate.year}</p>
                <h3>{certificate.title}</h3>
                <p>{certificate.issuer}</p>
                <span className="certificate-badge">Verified</span>
              </motion.article>
            ))}
          </div>
          <div className="achievement-highlight">
            {achievements.map((item) => (
              <article key={item.title} className="achievement-card">
                <p className="certificate-year">{item.year}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section work-ref">
        <div className="container">
          <h2>
            Professional <span>Experience</span>
          </h2>

          <div className="work-layout">
            <div className="skills-marquee">
              <div>
                {[...marqueeSkills, ...marqueeSkills].map((item, index) => (
                  <span key={`${item}-${index}`}>{item}</span>
                ))}
              </div>
            </div>

            <div className="timeline-ref">
              {professionalExperience.map((item) => (
                <article key={item.company} className="timeline-item-ref">
                  <p>{item.duration}</p>
                  <h3>{item.role}</h3>
                  <h4>{item.company}</h4>
                  <ul className="experience-points">
                    {item.points.map((point) => (
                      <li key={`${item.company}-${point}`}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="section projects-ref">
        <div className="container">
          <h2>
            Projects <span>Highlights</span>
          </h2>
          <p className="section-lead">
            Below are select highlight projects from my GitHub portfolio,
            covering mobile apps, full-stack systems, and responsive web
            platforms.
          </p>
          <div className="project-grid-ref">
            {projects.map((project) => (
              <motion.article
                key={project.title}
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="project-ref-card"
              >
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="project-highlights">
                  {project.highlights.map((highlight) => (
                    <li key={`${project.title}-${highlight}`}>{highlight}</li>
                  ))}
                </ul>
                <div className="chips-ref">
                  {project.stack.map((tech) => (
                    <span key={`${project.title}-${tech}`}>{tech}</span>
                  ))}
                </div>
                <p className="project-impact">{project.impact}</p>
                <a href={project.href} target="_blank" rel="noreferrer">
                  View project
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="section about-ref">
        <div className="container">
          <h2>Education</h2>
          <div className="timeline-ref">
            {education.map((item) => (
              <article key={item.degree} className="timeline-item-ref">
                <p>{item.duration}</p>
                <h3>{item.degree}</h3>
                <h4>{item.institution}</h4>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-ref">
        <div className="container">
          <h2>Contact</h2>
          <div className="contact-layout">
            <aside className="contact-info-panel">
              <p className="section-lead">
                I&apos;m always open to new challenges, collaborations, or
                opportunities.
              </p>
              <div className="contact-links-panel">
                <a href={`mailto:${contactInfo.email}`}>
                  📧 {contactInfo.email}
                </a>
              </div>
              <div className="contact-status-card">
                <p>Availability</p>
                <h3>Open to Full-Time Roles & Collaborations</h3>
                <span>Based in Dublin, Ireland</span>
              </div>
            </aside>

            <form className="contact-form-ref" onSubmit={handleSubmit}>
              <input
                type="hidden"
                name="_subject"
                value="New Message from Portfolio Website"
              />
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
              />

              <label>
                Full Name
                <input type="text" name="name" required />
              </label>
              <label>
                Email
                <input type="email" name="email" required />
              </label>
              <label>
                Subject
                <input type="text" name="subject" required />
              </label>
              <label>
                Message
                <textarea name="message" rows={5} required />
              </label>

              <button type="submit" disabled={formStatus === "sending"}>
                {formStatus === "sending" ? "Sending..." : "Send Message"}
              </button>

              {formStatus === "sent" && (
                <p className="form-ok">
                  Message sent successfully. Reach me at
                  <a href="mailto:mdjaveed9108@gmail.com">
                    {" "}
                    mdjaveed9108@gmail.com
                  </a>
                </p>
              )}
              {formStatus === "error" && (
                <p className="form-error">
                  Could not send message now. Email
                  <a href="mailto:mdjaveed9108@gmail.com">
                    {" "}
                    mdjaveed9108@gmail.com
                  </a>
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <footer className="footer-ref">
        <div className="container">
          <p>© {year} Mohammed Javeed. All rights reserved.</p>
          <div>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
