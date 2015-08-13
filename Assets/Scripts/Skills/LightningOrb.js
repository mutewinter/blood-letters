#pragma strict

class LightningOrb extends Skill {
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
    super.Start();
  }
}
