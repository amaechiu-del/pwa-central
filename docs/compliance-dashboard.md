# PWA compliance reporting contract

PWA Central generates a read-only compliance JSON report. DomisLink Control Centre may ingest this artifact as a dashboard source. Do not provision a separate dashboard, database or paid service.

Checks are tri-state: pass, fail or unknown. Unknown means not tested, not success. Registry entries are not proof of production deployment. The initial report intentionally leaves runtime and real-device checks unknown.

A future CI integration may collect manifest and service-worker evidence from checked-out application builds. Real-device install, offline restart and 180-day endurance require independently verified evidence. Never infer compliance from a repository name or a reachable URL.

Reports contain only application identifiers, public origins and check results; no credentials or user data.
