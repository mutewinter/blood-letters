#pragma strict

class LightningOrb extends Skill {
  public var wiggleRate   = 0.05;

  public var frequency = 10f;  // Speed of sine movement
  public var magnitude = 25f;   // Size of sine movement

  function Awake() {
    damageMin = 4;
    damageMax = 8;
    symbol = 'O';
    super.Awake();
  }

  function Start() {
    var singleProjectileAbility =
      gameObject.AddComponent(SingleProjectileAbility);
    singleProjectileAbility.damage = damage;
    Color.TryParseHexString('96BDD0', singleProjectileAbility.color);
    abilities.Add(singleProjectileAbility);
    singleProjectileAbility.shouldDestroyOnHit = false;
    singleProjectileAbility.projectilePrefabName =
      'Assets/Prefabs/LightningOrb.prefab';
    singleProjectileAbility.callback = wiggle;
    super.Start();
  }

  function wiggle(projectile: Projectile, previousPosition: Vector2) {
    if (!this) { return; }
    if (previousPosition == Vector2.zero) { return; }

    var rigidbody2D = projectile.GetComponent.<Rigidbody2D>();

    var position = rigidbody2D.position;
    position += transform.up * Time.deltaTime * wiggleRate;

    // From http://answers.unity3d.com/questions/564166
    var first = projectile.transform.position;
    var second = previousPosition;
    var newVec = first - second;
    var relativeTo = Vector3.Cross(newVec, Vector3.forward);
    relativeTo.Normalize();

    var newPosition = position + relativeTo *
      Mathf.Sin(Time.time * frequency) * magnitude;
    rigidbody2D.AddForce(newPosition);
  }
}
