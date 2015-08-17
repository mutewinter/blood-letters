#pragma strict

import System.Collections.Generic;

class SkillOptions extends System.ValueType {
  public var direction: Vector2;
  public var character: Character;
}

class Skill extends MonoBehaviour {
  public var dropColor = Color.white;

  public var damage = 1;
  public var damageMin = 1;
  public var damageMax = 1;
  public var symbol = 'L';
  // We use an array to keep track of all the abilities this skill has because
  // GetComponent(Ability) returns all Abilities for all instantiated skills.
  public var abilities = new List.<MonoBehaviour>();

  function Awake() {
    damage = Random.Range(damageMin, damageMax);
  }

  function Start() {
    SendMessageUpwards(
      'skillAdded', this, SendMessageOptions.DontRequireReceiver
    );
  }

  function OnDestroy() {
    for (var ability in abilities) {
      Destroy(ability);
    }
  }
}
