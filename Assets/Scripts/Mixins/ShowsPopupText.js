#pragma strict

class ShowsPopupText extends MonoBehaviour {
  public var defaultColor = Color.white;

  private var damageTextPrefab : GameObject;

  function Awake() {
    damageTextPrefab = AssetDatabase.LoadAssetAtPath(
      'Assets/Prefabs/DamageText.prefab',
      typeof(GameObject)
    );
    if (!damageTextPrefab) {
      Debug.LogWarning('ShowsPopupText: Missing damageTextPrefab');
    }
  }

  function show(amount, target: Vector3) {
    return show(amount, target, defaultColor);
  }

  function show(amount, target: Vector3, newColor: Color) {
    var textPosition = target;
    textPosition.y += 0.3;
    var damageText = Instantiate(
      damageTextPrefab, textPosition, Quaternion.identity
    );
    var textMesh = damageText.GetComponent.<TextMesh>();
    textMesh.color = newColor;
    textMesh.text = String.Format('{0}', amount);

    return void;
  }
}
