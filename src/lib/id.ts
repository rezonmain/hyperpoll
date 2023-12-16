import { init as configCuid } from "@paralleldrive/cuid2";
const cuid = configCuid({ length: 6 });

const generateId = () => cuid();

export { generateId };
