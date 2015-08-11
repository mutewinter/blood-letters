#pragma strict

import System.Collections.Generic;

class DropsSkills extends MonoBehaviour {
  public var possibleSkillsDropped = [Bow, Fire];
  private var skillDropPrefab: GameObject;

  function Start() {
    skillDropPrefab = AssetDatabase.LoadAssetAtPath(
      'Assets/Prefabs/SkillDrop.prefab',
      typeof(GameObject)
    );
    if (!skillDropPrefab) {
      Debug.LogWarning('DropSkills: Missing SkillDrop prefab');
    }
  }

  function onDied() {
    if (possibleSkillsDropped.length == 0) { return; }

    // Then skill dropped
    var randomLootIndex = Random.Range(0, possibleSkillsDropped.length);
    var skill = possibleSkillsDropped[randomLootIndex];

    var lootPosition = transform.position;
    lootPosition.y += 0.3;
    var skillDropObject = Instantiate(
      skillDropPrefab, lootPosition, Quaternion.identity
    );
    var skillDrop = skillDropObject.GetComponent.<SkillDrop>();

    skillDrop.gameObject.AddComponent(skill);
  }
}
