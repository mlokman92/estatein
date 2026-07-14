import { supabase } from "./supabase";
import type { TableName } from "./collections";

/**
 * Untyped table accessor for the schema-driven engine. The typed client exposes
 * a per-table overload set on `.from()`, which a dynamic (runtime) table name
 * can't satisfy — so the engine goes through this escape hatch. The bespoke
 * Property pages use the fully-typed `supabase` client directly.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fromTable = (name: TableName): any => (supabase.from as any)(name);
