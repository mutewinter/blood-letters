#pragma strict

import System.Collections.Generic;

class Arc extends Projectile {
  function Awake() {
    speed = 800;
    secondsToLive = 0.1;
    super.Awake();
    shootable.fireCallback = swing;
  }

  function swing(projectileOptions: ProjectileOptions) {
    transform.position.x += 0.15;
  }
}
