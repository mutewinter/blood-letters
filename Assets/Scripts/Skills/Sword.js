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
      'Assets/Prefabs/SwordWrapper.prefab';
    abilities.Add(singleProjectileAbility);
    super.Start();
  }
}
