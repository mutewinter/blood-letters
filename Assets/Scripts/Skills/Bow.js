#pragma strict

class Bow extends Skill {
  function Awake() {
    damageMin = 1;
    damageMax = 3;
    symbol = 'D';
    // Same as kobold
    Color.TryParseHexString('FBE39F', color);

    projectilePrefabName = 'Assets/Prefabs/Bullet.prefab';

    super.Awake();
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
