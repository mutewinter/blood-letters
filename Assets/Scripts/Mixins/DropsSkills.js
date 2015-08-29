#pragma strict

import System.Collections.Generic;


class DropsSkills extends MonoBehaviour {
  public var possibleSkillsDropped: List.<System.Type> =
    new List.<System.Type>();
  private var skillDropPrefab: GameObject;

  function Start() {
    skillDropPrefab = Resources.Load(
      'SkillDrop',
      typeof(GameObject)
    );
    if (!skillDropPrefab) {
      Debug.LogWarning('DropsSkills: Missing SkillDrop prefab');
    }
  }

  function onDied() {
    if (possibleSkillsDropped.Count == 0) { return; }

    // Then skill dropped
    var randomLootIndex = Random.Range(0, possibleSkillsDropped.Count);
    var skill = possibleSkillsDropped[randomLootIndex];

    var lootPosition = transform.position;
    lootPosition.y += 0.3;
    var skillDropObject = Instantiate(
      skillDropPrefab, lootPosition, Quaternion.identity
    );
    var skillDrop = skillDropObject.GetComponent.<SkillDrop>();

    if (skill) {
      skillDrop.gameObject.AddComponent(skill);
    }
  }
}
