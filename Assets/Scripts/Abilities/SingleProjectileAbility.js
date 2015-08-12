#pragma strict

class SingleProjectileAbility extends Ability {
  var damage = 0;

  public var projectilePrefab: GameObject;
  public var projectilePrefabName: String;
  public var color = Color.magenta;

  function Awake() {
    projectilePrefabName = 'Assets/Prefabs/Bullet.prefab';
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

    var bulletObject = Instantiate(
      projectilePrefab, transform.position, Quaternion.identity
    );
    var bullet = bulletObject.GetComponent.<Bullet>();
    bullet.shooter = character;
    bullet.fire(skillOptions.direction, damage + character.damage);

    var skill = GetComponent(Skill);
    if (skill) {
      bullet.GetComponent.<Renderer>().material.color = color;
    }

    return bullet;
  }
}
