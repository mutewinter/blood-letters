#pragma strict

class ProjectileOptions extends System.ValueType {
  public var character: Character;
  public var direction: Vector2;
  public var damage: int;
  public var shouldDestroyOnHit: boolean;
}

class Projectile extends MonoBehaviour {
  public var secondsToLive = 0.8;
  public var speed : float = 100;
  public var shootable: Shootable;

  function Awake() {
    shootable = gameObject.AddComponent(Shootable);
    shootable.projectile = gameObject;
  }

  function Start() {
    shootable.speed = speed;
    shootable.secondsToLive = secondsToLive;
  }

  function fire(projectileOptions: ProjectileOptions) {
    shootable.fire(projectileOptions);
  }

  function processHit(victim: Character) {
    shootable.processHit(victim);
  }
}
