#pragma strict

class Sword extends Skill {
  function Awake() {
    damageMin = 3;
    damageMax = 5;
    symbol = 'S';
    super.Awake();
  }

  function Start() {
    var singleProjectileAbility =
      gameObject.AddComponent(SingleProjectileAbility);
    singleProjectileAbility.damage = damage;
    Color.TryParseHexString('ffffff', singleProjectileAbility.color);
    singleProjectileAbility.shouldDestroyOnHit = false;
    singleProjectileAbility.projectilePrefabName =
      'Assets/Prefabs/Sword.prefab';
    abilities.Add(singleProjectileAbility);
    singleProjectileAbility.callback = swingRotation;
    super.Start();
  }

  function swingRotation(projectile: Projectile, previousPosition: Vector2) {
    projectile.transform.rotation =
      Quaternion.RotateTowards(
        projectile.transform.rotation,
        Quaternion.Euler(0, 0, -90), 1200 * Time.deltaTime
    );
  }
}
