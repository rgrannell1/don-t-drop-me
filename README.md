
# Don't Drop Me!

## `devicemotion`

The device is represented as a point `(x, y, z)` in 3d space:

- `x`: left to right in the plane of the screen
- `y`: bottom to top in the plane of the screen
- `z`: back to front perpendicular to the screen

The `acceleration` vector will be `(0, 0, 0)` when the device is at rest. Dropping it will transform this vector with a vector `A = (ax, ay, az)`, with the magnitude `||A||` being `~9.81`
# don-t-drop-me
