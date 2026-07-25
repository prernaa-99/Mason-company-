# Dark theme backup

This folder is a complete snapshot of the Mason site **before** the light-theme
conversion (warm-dark bg, terracotta/oxblood accent). The live site is now the
**light theme** (warm off-white bg, emerald accent).

## To restore the dark theme

Copy these files back over the live ones from the project root:

```
cp backup-dark-theme/app/globals.css        app/globals.css
cp backup-dark-theme/components/Nav.tsx      components/Nav.tsx
cp backup-dark-theme/components/Booking.tsx  components/Booking.tsx
cp backup-dark-theme/components/Transformations.tsx components/Transformations.tsx
cp backup-dark-theme/components/ProductRail.tsx     components/ProductRail.tsx
cp backup-dark-theme/components/Footer.tsx   components/Footer.tsx
```

(The rest of the components are colour-token driven and did not need editing,
but full copies are here too if you want a clean revert of everything.)

The whole theme lives in the CSS variables in `app/globals.css` — restoring that
file alone flips ~85% of the site back; the component files above cover the few
spots that hardcode a light/dark assumption (CTA fills, photo scrims, slider knob).
