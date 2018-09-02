# Managing reminder-app

This documentation covers most of the information
needed to manage a reminder-app.

### Upgrading reminder-app

To upgrade reminder-app you'll need to fetch the latest
code from github. Pulling latest code does not upgrade the
reminder-app. To finish the upgrade run the upgrade script
`node scripts/upgrade` to finish the upgrade. It will involve
some downtime.

```bash
# for to example upgrading to a specific tag v1.0.0-beta
# fetch all remote refs.
git fetch --all

# checkout out to sepecific tag
git checkout v1.0.0-beta

# run the upgrade script
node scripts/upgrade
```
