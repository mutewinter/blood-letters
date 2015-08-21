#pragma strict

import System.Collections.Generic;

class Arc extends Projectile {
  function Awake() {
    speed = 800;
    // Will be destroyed when the animation completes, but just in case -- we
    // have a timeout.
    secondsToLive = 5;
    super.Awake();
    shootable.fireCallback = swing;
  }

  function swing(projectileOptions: ProjectileOptions) {
    transform.position.x += 0.15;
    var animator = gameObject.GetComponent(Animator);
    if (animator) {
      animator.SetTrigger('swing');
    }
  }

  function onFinishedSwing() {
    Destroy(gameObject);
  }
}
