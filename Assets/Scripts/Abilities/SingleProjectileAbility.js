#pragma strict

class SingleProjectileAbility extends Ability {
  var damage = 0;

  public var projectilePrefab: GameObject;
  public var projectilePrefabName = 'Assets/Prefabs/Bullet.prefab';
  public var color = Color.magenta;
  public var callback: Function;

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
    if (!projectilePrefab) {
      Debug.LogWarning('SingleProjectileAbility: Missing projectilePrefab');
      return;
    }
    var character = skillOptions.character;

    var projectileObject = Instantiate(
      projectilePrefab, transform.position, Quaternion.identity
    );
    var projectile = projectileObject.GetComponent.<Projectile>();
    var projectileOptions = new ProjectileOptions(skillOptions);
    projectileOptions.shouldDestroyOnHit = shouldDestroyOnHit;
    projectile.callback = callback;
    projectile.fire(projectileOptions);

    projectile.GetComponent.<Renderer>().material.color = color;
  }
}
