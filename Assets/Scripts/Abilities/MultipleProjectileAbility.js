#pragma strict

class MultipleProjectileAbility extends Ability {
  var damage = 0;

  public var projectilePrefab: GameObject;
  public var projectilePrefabName: String;
  public var color = Color.magenta;
  public var projectileCount = 3;
  public var spreadAngle = 10;

  function Awake() {
    projectilePrefabName = 'Assets/Prefabs/Bullet.prefab';
  }

  function Start() {
    if (projectilePrefabName) {
      projectilePrefab = AssetDatabase.LoadAssetAtPath(
        projectilePrefabName,
        typeof(GameObject)
      );
      if (!projectilePrefab) {
        Debug.LogWarning(String.Format(
          'Skill: Missing Projectile Prefab {0}', projectilePrefabName
        ));
      }
    }
  }

  function useSkill(skillOptions: SkillOptions) {
    var character = skillOptions.character;

    for (var i = 0; i < projectileCount; i++) {
      var bulletObject = Instantiate(
        projectilePrefab, transform.position, Quaternion.identity
      );

      var bullet = bulletObject.GetComponent.<Bullet>();
      bullet.secondsToLive = 0.4;
      bullet.shooter = character;

      var direction = skillOptions.direction;

      // TODO Make generic and able to support N projectiles.
      switch (i) {
        case 1:
          direction =
            Quaternion.AngleAxis(-spreadAngle, Vector3.forward) * direction;
          break;
        case 2:
          direction =
            Quaternion.AngleAxis(spreadAngle, Vector3.forward) * direction;
          break;
      }

      bullet.fire(direction, damage + character.damage);

      bullet.GetComponent.<Renderer>().material.color = color;
    }

  }
}
