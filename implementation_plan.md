# Implementation Plan - Admin Enhancements

## 1. Notification System
**File:** `app/api/admin/stats/notifications/route.ts` (NEW)
- **Logic:** Fetch counts where `status: 'new'` for `InscriptionSubmission`, `ContactSubmission`, `RecruitmentSubmission`, `FranchiseSubmission`.
- **Return:** JSON `{ inscriptions: 5, contact: 2, ... }`

**File:** `components/admin/sidebar.tsx`
- **Logic:** Fetch notification stats on mount.
- **UI:** Add `<Badge>` or styled `<span>` with count next to menu items.

## 2. Events Display
**File:** `app/admin/events/page.tsx`
- **Logic:** In the `.map()` of events, remove the `if (event.imageUrl)` block.
- **UI:** Ensure `event.descriptionFr` is displayed (it already is). Validated it looks "brief" or is truncated if needed (CSS `line-clamp-2` is already there).

## 3. Inscription CV
**File:** `app/admin/submissions/inscription/page.tsx`
- **Logic:** Add `cvUrl` to TS interface.
- **UI:** In the Dialog (Details view), add a "Voir CV" button using `<a target="_blank">` if `cvUrl` exists.
