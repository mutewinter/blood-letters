#pragma strict

import System.Collections.Generic;

class Arc extends Projectile {
  var distanceFromCharacter = 0.35;

  function Awake() {
    speed = 800;
    // Will be destroyed when the animation completes, but just in case -- we
    // have a timeout.
    secondsToLive = 5;
    super.Awake();
    shootable.fireCallback = swing;
  }

  function swing(projectileOptions: ProjectileOptions) {
    var direction = projectileOptions.direction;
    var angle = Mathf.Atan2(direction.y, direction.x) * Mathf.Rad2Deg;
    transform.rotation = Quaternion.AngleAxis(angle, Vector3.forward);
    // Flip sprite if player is attacking to the left
    if (direction.x <= 0) {
      transform.rotation = Quaternion.AngleAxis(180, Vector3.up);
    }
    transform.position += direction.normalized * distanceFromCharacter;
    var animator = gameObject.GetComponent(Animator);
    if (animator) {
      animator.SetTrigger('swing');
    }
  }

  function onFinishedSwing() {
    Destroy(gameObject);
  }
}
