# Milestone 13: Reuse existing Services Registry

Repository audit found `amaechiu-del/domislink-services-registry`, an existing Cloudflare Worker/D1 service inventory with OneLink JWT authorization, and `amaechiu-del/domislink-admin`. The previously proposed `domislink-control` repository was not found in the available repository listing.

PWA Central now supplies a read-only reconciliation adapter. Control Centre should authenticate through the existing OneLink contract, request `GET /v1/services` with `services:read`, load the PWA compliance artifact, and match on repository or canonical origin. Conflicts must be reviewed manually. Never auto-create services or treat an unmatched app as deployed.

No D1 provisioning, new Worker, duplicate dashboard or public write endpoint is required. The existing Services Registry README says its provisioning and SSO acceptance are unverified. Do not connect production traffic until its existing authentication, database and deployment gates pass.
