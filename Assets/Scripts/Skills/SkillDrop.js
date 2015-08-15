#pragma strict

class SkillDrop extends MonoBehaviour {
  public var secondsToLive = 3;

  function Start() {
    updateColliderBounds();

    yield WaitForSeconds(secondsToLive);
    if (this) {
      Destroy(gameObject);
    }
  }

  function OnTriggerEnter2D(other: Collider2D) {
    var player = other.GetComponentInParent(Player);
    if (player) {
      player.SendMessage('pickUp', GetComponent(Skill));
      Destroy(gameObject);
    }
  }

  function getSymbol() : Symbol {
    return GetComponentInChildren.<Symbol>();
  }

  function updateColliderBounds() {
    var textMesh = getSymbol().GetComponent.<TextMesh>();
    var textMeshRenderer = textMesh.GetComponent.<Renderer>();
    var boxCollider2D = GetComponent.<BoxCollider2D>();
    boxCollider2D.size = Vector2(
      textMeshRenderer.bounds.size.x,
      textMeshRenderer.bounds.size.y
    );
    boxCollider2D.transform.position = textMesh.transform.position;
  }

  function updateTooltip() {
    var skill = GetComponent(Skill);
    if (skill) {
      var damageSign = skill.damage > 0 ? '+' : '';
      var tooltip = GetComponentInChildren(Tooltip);
      tooltip.text = String.Format('{0}{1}', damageSign, skill.damage);
    }
  }

  function skillAdded(skill: Skill) {
    getSymbol().text = skill.symbol;
    updateTooltip();
    updateColliderBounds();
  }
}
