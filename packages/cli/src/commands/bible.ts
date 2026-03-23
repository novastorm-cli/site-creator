import chalk from 'chalk';

const BIBLE_TEXT = `
${chalk.cyan.bold('╔══════════════════════════════════════════════════════════════╗')}
${chalk.cyan.bold('║')}  ${chalk.white.bold('[DOCUMENT_CLASS: MANIFESTO]')}  ${chalk.gray('[STATUS: DECLASSIFIED]')}     ${chalk.cyan.bold('║')}
${chalk.cyan.bold('╚══════════════════════════════════════════════════════════════╝')}

${chalk.green.bold('Ambient Development')}
${chalk.gray('A manifesto for a new approach to building software')}
${chalk.gray('──────────────────────────────────────────────────────────────')}

${chalk.cyan('PART I')} — ${chalk.white.bold('The problem everyone is solving from the wrong end')}

We live in an era where AI can write code. GPT, Claude, Gemini, dozens
of models — all generating functions, components, entire applications.
Every month a new tool appears. Each one promises a revolution. Each
one does the same thing — helps turn text into code faster.

And here's the paradox: ${chalk.green('code was never the real bottleneck.')}

  ${chalk.gray('[RESEARCH] Bain 2025 — Where time actually goes')}
  ${chalk.gray('Writing & testing code .......')} ${chalk.dim('25-35%')}
  ${chalk.green('Everything else .............')} ${chalk.green('65-75%')}
  ${chalk.gray('(Understanding, formulation, review, integration, deploy)')}

By speeding up code generation 10x, we only sped up the entire
process by 20-30%.

  ${chalk.gray('Traditional')}  → write code
  ${chalk.gray('Vibe coding')}  → write prompt
  ${chalk.gray('Spec-driven')}  → write spec
  ${chalk.gray('Visual-first')} → click in special editor
  ${chalk.green.bold('Ambient')}      → ${chalk.green('just use your app')}

${chalk.gray('──────────────────────────────────────────────────────────────')}

${chalk.cyan('PART II')} — ${chalk.white.bold('What is Ambient Development')}

${chalk.white.bold('Ambient Development')} — an approach to building software where the
system continuously observes the application in use and builds it
out across every level of the stack based on user behavior, voice
commands, and visual cues.

  ${chalk.gray('♪  Ambient Music')}     — Creates atmosphere. Doesn't demand attention.
  ${chalk.gray('◐  Ambient Lighting')}  — Creates space. You don't think about bulbs.
  ${chalk.gray('◈  Ambient Computing')} — Smart home, sensors. You live, it adapts.
  ${chalk.green('⌘  Ambient Dev')}       — ${chalk.green('You use the product. Development happens around you.')}

You stop switching between the role of user and the role of developer.
${chalk.green('You are always the user. Development is ambient.')}

${chalk.gray('──────────────────────────────────────────────────────────────')}

${chalk.cyan('PART III')} — ${chalk.white.bold('Five principles')}

${chalk.green('01')} ${chalk.white.bold('Usage as specification')}
   The best specification is not one written in a document. The best
   specification is a person's behavior inside the product.

   ${chalk.gray('[behavior]')} click on empty space → expects something there
   ${chalk.gray('[behavior]')} repeat action 5x → needs automation
   ${chalk.gray('[behavior]')} open page, leave in 1s → page doesn't deliver
   ${chalk.green('[ambient]')}  ${chalk.green('behavior never lies. behavior is the spec.')}

${chalk.green('02')} ${chalk.white.bold('Full stack vertical')}
   When you say "add a customers table with search," you don't mean
   "create a React component." You mean: I want to see my customers,
   and I want it to work.

   ${chalk.cyan('UI Component')} ↕ ${chalk.cyan('API Endpoint')} ↕ ${chalk.cyan('Database Query')} ↕ ${chalk.cyan('Migration')}

${chalk.green('03')} ${chalk.white.bold('Three simultaneous modes')}
   ${chalk.gray('PASSIVE')} 👁  — Silently observes. Suggests improvements.
   ${chalk.cyan('VOICE')}   🎤 — Say what you need without switching context.
   ${chalk.yellow('VISUAL')}  👆 — Click, circle, drag. Point and speak.
   ${chalk.gray('All three work simultaneously. Not switches — layers.')}

${chalk.green('04')} ${chalk.white.bold('Speed lanes')}
   ${chalk.green('LANE 1')} <2s    — CSS, texts, configs. No AI. Pattern matching.
   ${chalk.cyan('LANE 2')} 10-30s — Single-file changes. Fast model.
   ${chalk.yellow('LANE 3')} 1-5min — Multi-file features. Strong model.
   ${chalk.red('LANE 4')} min-hrs — Background refactoring. Async.

${chalk.green('05')} ${chalk.white.bold('Stack-agnostic')}
   ${chalk.green('[scan]')} package.json → Next.js + TypeScript
   ${chalk.green('[scan]')} .csproj → C# backend
   ${chalk.green('[scan]')} docker-compose.yml → PostgreSQL
   ${chalk.cyan('[ready]')} Stack detected. ${chalk.green('Ambient mode activated.')}

${chalk.gray('──────────────────────────────────────────────────────────────')}

${chalk.cyan('PART IV')} — ${chalk.white.bold('What it looks like in practice')}

  ${chalk.gray('MORNING')}
  ${chalk.gray('[you]')}     open SaaS. check dashboard. "this table is slow."
  ${chalk.cyan('[ambient]')} found: SELECT * without pagination
  ${chalk.yellow('[lane 3]')} generating optimized query + pagination
  ${chalk.green('[done]')}    hot reload. table loads instantly. 2 minutes.

  ${chalk.gray('DAY')}
  ${chalk.gray('[you]')}     "Save button too small on mobile"
  ${chalk.green('[lane 1]')} CSS injection. done. instant.
  ${chalk.gray('[you]')}     "Add timezone picker to project form"
  ${chalk.cyan('[lane 2]')} component + API field. 20 seconds.

  ${chalk.gray('EVENING')}
  ${chalk.green('[summary]')} 4 instant fixes | 2 fast changes | 1 feature
  ${chalk.green('[result]')}  ${chalk.green('zero IDE. zero prompts. zero context switches.')}

  ${chalk.gray('NIGHT')}
  ${chalk.gray('[you]')}     "Refactor auth module — split into services"
  ${chalk.yellow('[lane 4]')} background. agent running...
  ${chalk.green('[morning]')} PR ready. all tests green.

${chalk.gray('──────────────────────────────────────────────────────────────')}

${chalk.cyan('PART V')} — ${chalk.white.bold('Who is this for')}

  ${chalk.green('✓')} Solo developer building a SaaS
  ${chalk.green('✓')} Startup team of 2-5 shipping daily
  ${chalk.green('✓')} Agency creating 10+ projects a year
  ${chalk.green('✓')} CTO prototyping ideas before allocating the team
  ${chalk.green('✓')} Enterprise teams looking for a multiplier

${chalk.gray('──────────────────────────────────────────────────────────────')}

${chalk.cyan('PART VI')} — ${chalk.white.bold('The future')}

What happens when you remove the formulation step entirely?

  ${chalk.gray('Total time per task')}  ${chalk.green('↓ 60-70%')}
  ${chalk.gray('Context switches')}     ${chalk.green('→ 0')}
  ${chalk.gray('Time-to-feedback')}     ${chalk.green('seconds, not hours')}

Code generation was step one. Ambient development is step two.
Not "write code faster." ${chalk.green.bold('Stop writing altogether.')}

${chalk.gray('══════════════════════════════════════════════════════════════')}
  ${chalk.gray('Read the full version with infographics:')}
  ${chalk.cyan('https://cli.novastorm.ai/bible/')}

  ${chalk.gray('GitHub:')}  ${chalk.cyan('https://github.com/novastorm-cli/nova')}
  ${chalk.gray('npm:')}     ${chalk.cyan('npm install -g @novastorm-ai/cli')}
  ${chalk.gray('X:')}       ${chalk.cyan('https://x.com/upranevich')}
  ${chalk.gray('TG:')}      ${chalk.cyan('https://t.me/novastormcli')}
${chalk.gray('══════════════════════════════════════════════════════════════')}
`;

export async function bibleCommand(subcommand?: string): Promise<void> {
  if (subcommand === '--read' || subcommand === 'read' || !subcommand) {
    console.log(BIBLE_TEXT);
  } else {
    console.log(chalk.yellow(`Unknown subcommand: ${subcommand}`));
    console.log(chalk.gray('Usage: nova bible [--read]'));
  }
}
