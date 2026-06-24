# AI Workflow Rules & Code Standards

## AI Behavior
- **Incremental Implementation:** Write code step-by-step. Do not skip implementation details with placeholders like `// TODO: implement later`.
- **State Awareness:** Before starting any task, consult `progress.md` to confirm the current state.
- **No Feature Creep:** Reject any changes or technical implementations that fall outside the bounds of `.context/features.md` or `.context/architecture.md`.

## Code Standards
- **Language:** TypeScript strictly typed. Avoid `any`. Prefer implicit return types for hooks, explicit for utilities.
- **React:** React 19+, functional components, hooks pattern (`const [state, setState] = useState()`).
- **Styling:** Tailwind CSS using utility classes. Maintain clean layouts without excessive animations.
- **File Structure:** - Components must remain focused and modular.
  - Separate pure presentation components from business logic/hooks.