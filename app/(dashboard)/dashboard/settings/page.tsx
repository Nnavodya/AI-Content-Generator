"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { User, Lock, SlidersHorizontal, Trash2, Moon } from "lucide-react";
import { useDarkMode } from "@/hooks/use-dark-mode";

export default function SettingsPage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const { isDark, toggle: toggleDarkMode } = useDarkMode();

  const fullNameRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLInputElement>(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [deleting, setDeleting] = useState(false);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSavingProfile(true);
    setProfileMessage("");
    try {
      const fullName = fullNameRef.current?.value.trim() ?? "";
      const bio = bioRef.current?.value ?? "";
      const [firstName, ...rest] = fullName.split(" ");
      await user.update({
        firstName: firstName || "",
        lastName: rest.join(" "),
        unsafeMetadata: { ...user.unsafeMetadata, bio },
      });
      setProfileMessage("Profile updated.");
    } catch (err) {
      console.error(err);
      setProfileMessage("Couldn't update profile. Please try again.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!user) return;
    setPasswordError("");
    setPasswordMessage("");

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation don't match.");
      return;
    }

    setSavingPassword(true);
    try {
      await user.updatePassword({
        currentPassword,
        newPassword,
      });
      setPasswordMessage("Password updated.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "Couldn't update password.";
      setPasswordError(message);
    } finally {
      setSavingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    const confirmed = confirm(
      "This will permanently delete your account and all generated content. This cannot be undone. Continue?"
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      await user.delete();
      await signOut();
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Couldn't delete account. Please try again.");
      setDeleting(false);
    }
  };

  if (!isLoaded) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account identity, security, and preferences.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Account Information */}
      <section className="rounded-2xl border border-border">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
          <User className="size-4 text-blue-600" />
          <div>
            <h2 className="font-semibold text-sm">Account Information</h2>
            <p className="text-xs text-muted-foreground">
              Update your personal details.
            </p>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block mb-1.5 text-sm font-medium">Full Name</label>
            <input
              ref={fullNameRef}
              className="w-full border border-border rounded-lg p-2.5 text-sm"
              defaultValue={user?.fullName ?? ""}
              autoComplete="name"
            />
          </div>
          <div>
            <label className="block mb-1.5 text-sm font-medium">Email Address</label>
            <input
              className="w-full border border-border rounded-lg p-2.5 text-sm bg-muted text-muted-foreground"
              value={user?.primaryEmailAddress?.emailAddress ?? ""}
              disabled
            />
            <p className="text-xs text-muted-foreground mt-1">
              Email changes require verification and aren&apos;t supported here yet.
            </p>
          </div>
          <div>
            <label className="block mb-1.5 text-sm font-medium">Professional Bio</label>
            <input
              ref={bioRef}
              name="professional-bio"
              className="w-full border border-border rounded-lg p-2.5 text-sm"
              placeholder="Content Strategist & AI Enthusiast..."
              defaultValue={(user?.unsafeMetadata?.bio as string) ?? ""}
              autoComplete="off"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveProfile}
              disabled={savingProfile}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium px-4 py-2.5 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {savingProfile ? "Saving..." : "Save Changes"}
            </button>
            {profileMessage && (
              <span className="text-sm text-muted-foreground">{profileMessage}</span>
            )}
          </div>
        </div>
      </section>

      {/* Security & Password */}
      {user?.passwordEnabled && (
        <section className="rounded-2xl border border-border">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
            <Lock className="size-4 text-blue-600" />
            <div>
              <h2 className="font-semibold text-sm">Security &amp; Password</h2>
              <p className="text-xs text-muted-foreground">
                Keep your account secure with a strong password.
              </p>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block mb-1.5 text-sm font-medium">Current Password</label>
              <input
                type="password"
                className="w-full border border-border rounded-lg p-2.5 text-sm"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1.5 text-sm font-medium">New Password</label>
                <input
                  type="password"
                  className="w-full border border-border rounded-lg p-2.5 text-sm"
                  placeholder="Minimum 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full border border-border rounded-lg p-2.5 text-sm"
                  placeholder="Repeat new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
            </div>
            {passwordError && (
              <p className="text-sm text-red-600">{passwordError}</p>
            )}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleUpdatePassword}
                disabled={savingPassword}
                className="rounded-lg border border-border text-sm font-medium px-4 py-2.5 hover:bg-muted transition-colors disabled:opacity-50"
              >
                {savingPassword ? "Updating..." : "Update Password"}
              </button>
              {passwordMessage && (
                <span className="text-sm text-muted-foreground">{passwordMessage}</span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Application Preferences */}
      <section className="rounded-2xl border border-border">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
          <SlidersHorizontal className="size-4 text-blue-600" />
          <div>
            <h2 className="font-semibold text-sm">Application Preferences</h2>
            <p className="text-xs text-muted-foreground">
              Customize how ContentFlow AI looks.
            </p>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Moon className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Dark Mode</p>
                <p className="text-xs text-muted-foreground">
                  Toggle between a light and dark interface.
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={isDark}
              onClick={toggleDarkMode}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                isDark ? "bg-blue-600" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform ${
                  isDark ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="rounded-2xl border border-red-200 bg-red-50">
        <div className="p-5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Trash2 className="size-4 text-red-600" />
            <div>
              <p className="text-sm font-semibold text-red-700">Danger Zone</p>
              <p className="text-xs text-red-600/80 max-w-sm">
                Once you delete your account, all your generated content is
                permanently removed. This cannot be undone.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDeleteAccount}
            disabled={deleting}
            className="rounded-lg border border-red-300 text-red-600 text-sm font-medium px-4 py-2.5 hover:bg-red-100 transition-colors disabled:opacity-50 shrink-0"
          >
            {deleting ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </section>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border p-5 text-center">
            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={user.fullName ?? "User"}
                className="size-16 rounded-full object-cover mx-auto mb-3"
              />
            ) : (
              <span className="flex size-16 items-center justify-center rounded-full bg-muted text-lg font-medium mx-auto mb-3">
                {user?.firstName?.[0] ?? "U"}
              </span>
            )}
            <p className="font-semibold">{user?.fullName ?? "Account"}</p>
            <p className="text-sm text-muted-foreground truncate">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
            <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
              Member since{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                : "—"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}