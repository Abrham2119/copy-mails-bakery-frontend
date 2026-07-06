/**
 * Route: /settings — demonstrates permission-gated UI with <Can>.
 */

import { Can } from "@/features/auth";

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Settings</h1>
      <Can require="settings.manage" fallback={<p className="text-sm text-ink/50">You don’t have permission to manage settings.</p>}>
        <p className="text-sm">Manage-settings controls render here for permitted users.</p>
      </Can>
    </div>
  );
}
