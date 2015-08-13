#pragma strict

class SingleProjectileAbility extends Ability {
  var damage = 0;

  public var projectilePrefab: GameObject;
  public var projectilePrefabName = 'Assets/Prefabs/Bullet.prefab';
  public var color = Color.magenta;
  public var shouldDestroyOnHit = false;
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

    var bulletObject = Instantiate(
      projectilePrefab, transform.position, Quaternion.identity
    );
    var bullet = bulletObject.GetComponent.<Bullet>();
    var projectileOptions = new ProjectileOptions();
    bullet.callback = callback;
    projectileOptions.damage = damage + character.damage;
    projectileOptions.direction = skillOptions.direction;
    projectileOptions.character = skillOptions.character;
    projectileOptions.shouldDestroyOnHit = shouldDestroyOnHit;
    bullet.fire(projectileOptions);

    var skill = GetComponent(Skill);
    if (skill) {
      bullet.GetComponent.<Renderer>().material.color = color;
    }

    return bullet;
  }
}
