# Admin Refinements

- [ ] **Inscription Details**
    - [ ] Review `app/admin/submissions/inscription/page.tsx` DB schema vs UI fields.
    - [ ] ensure ALL fields (phone, country, profile, motivation, cvUrl, lastDiploma, etc.) are displayed in the modal.
    - [ ] verify CV download button prominence.

- [ ] **Notification Clearance (Mark as Read)**
    - [ ] **Inscription**: Update `app/admin/submissions/inscription/page.tsx` to set status to `in_progress` (or `read`) when "Voir détails" is clicked.
    - [ ] **Contact**: Update `app/admin/submissions/contact/page.tsx` similarly.
    - [ ] **Franchise**: Update `app/admin/submissions/franchise/page.tsx` similarly.
    - [ ] **Recruitment**: Update `app/admin/submissions/recruitment/page.tsx` similarly.

- [ ] **Verification**
    - [ ] Simulate viewing a "new" item and verify badge count decreases.
